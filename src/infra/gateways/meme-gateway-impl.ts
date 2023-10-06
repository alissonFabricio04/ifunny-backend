import { Id } from "../../entities/id/model/id-value-object";
import { MemeGateway } from "../../entities/meme/gateways/meme-gateway";
import { Comment } from "../../entities/meme/model/comment";
import { Meme } from "../../entities/meme/model/meme";
import { prismaORM } from "../config/prisma-config";

export class MemeGatewayImpl implements MemeGateway {
  readonly prismaORM = prismaORM

  async publish(meme: Meme) {
    await this.prismaORM.memes.create({
      data: {
        id: meme.id.toString(),
        fk_author: meme.authorId.toString(),
        content_uri: meme.content.uri
      }
    })

    for await (const tag of meme.tags) {
      await this.prismaORM.tags.create({
        data: {
          name: tag.name,
          fk_meme: meme.id.toString()
        }
      })
    }
  }

  async addComment(memeId: Id, comment: Comment) {
    await this.prismaORM.comments.create({
      data: {
        id: comment.id.toString(),
        text: comment.content.text,
        fk_repub: comment.content.midia?.postId.toString(),
        fk_meme: memeId.toString(),
        fk_author: comment.authorId.toString()
      }
    })
  }

  async getComments(memeId: Id, page: number) {
    const peerPage = 20
    const c = await this.prismaORM.comments.findMany({
      take: peerPage,
      skip: Number(page - 1) * peerPage,
      include: {
        _count: {
          select: {
            like_comments: {
              where: {
                type: "UPVOTE"
              }
            },
          },
        },
        like_comments: true,
      },
      where: {
        fk_meme: memeId.toString()
      },
      orderBy: [
        {
          like_comments: {
            _count: 'desc',
          },
        },
      ],
    })

    const comments: Array<Comment> = []

    c.forEach(comment => {
      const midia = comment.fk_repub !== null ?
        { postId: new Id(comment.fk_repub) } :
        undefined

      comments.push(new Comment(
        new Id(comment.id),
        new Id(comment.fk_meme),
        new Id(comment.fk_author),
        {
          midia,
          text: comment.text !== null ? comment.text : undefined
        },
        comment._count.like_comments,
      ))
    })

    return comments
  }

  async find(memeId: Id) {
    const meme = await this.prismaORM.memes.findUnique({
      where: {
        id: memeId.toString()
      },
      include: {
        tags: true
      }
    })

    if (!meme) {
      return null
    }

    const tags: Array<{ name: string, weight: number }> = []
    meme.tags.forEach(({ name }) => {
      tags.push({ name, weight: 1 })
    })

    return new Meme(
      new Id(meme.id),
      new Id(meme.fk_author),
      {
        uri: meme.content_uri
      },
      tags
    )
  }

  async recentMemesNotLikedByUser(userId: Id, qty: number) {
    const currentDate = new Date()
    const twoHourAgo = new Date(currentDate.getTime() - 120 * 60 * 1000)

    const memes = await this.prismaORM.memes.findMany({
      take: qty,
      include: {
        tags: true,
        likes: {
          where: {
            fk_user: userId.toString(),
          },
        },
      },
      where: {
        created_at: {
          gte: twoHourAgo,
        },
        NOT: {
          likes: {
            some: {
              fk_user: userId.toString(),
            },
          },
        },
      },
    })

    const m: Array<Meme> = []
    memes.forEach(meme => {
      const tags: Array<{ name: string, weight: number }> = []
      meme.tags.forEach(({ name }) => {
        tags.push({ name, weight: 1 })
      })

      m.push(new Meme(
        new Id(meme.id),
        new Id(meme.fk_author),
        { uri: meme.content_uri },
        tags
      ))
    })

    return m
  }

  async lastLikes(userId: Id, qty: number) {
    const memes = await this.prismaORM.likes.findMany({
      take: qty,
      include: {
        meme: {
          include: {
            tags: true
          }
        }
      },
      where: {
        fk_user: userId.toString()
      }
    })


    const lastLikes: Array<Meme> = []
    memes.forEach(meme => {
      const tags: Array<{ name: string, weight: number }> = []
      meme.meme.tags.forEach(({ name }) => {
        tags.push({ name, weight: 1 })
      })

      lastLikes.push(new Meme(
        new Id(meme.fk_meme),
        new Id(meme.fk_user),
        { uri: meme.meme.content_uri },
        tags
      ))
    })

    return lastLikes
  }

  async like(memeId: Id, userId: Id) {
    await this.prismaORM.likes.create({
      data: {
        fk_user: userId.toString(),
        fk_meme: memeId.toString()
      }
    })
  }

  async alreadyLikedMeme(memeId: Id, userId: Id) {
    const m = await this.prismaORM.likes.findFirst({
      where: {
        fk_user: userId.toString(),
        fk_meme: memeId.toString()
      }
    })

    if (m) {
      return true
    }

    return false
  }

  async upvoteComment(commentId: Id, userId: Id) {
    const commentExists = await this.prismaORM.comments.findUnique({
      where: {
        id: commentId.toString()
      }
    })

    if (!commentExists) {
      throw new Error('Conteúdo não encontrado')
    }
    
    const userAlreadyUpvoteComment = await this.prismaORM.votes_comments.findFirst({
      where: {
        fk_user: userId.toString(),
        fk_comment: commentId.toString()
      }
    })

    if(userAlreadyUpvoteComment) {
      throw new Error('Você já reagiu a esse comentário')
    }

    await this.prismaORM.votes_comments.create({
      data: {
        fk_user: userId.toString(),
        fk_comment: commentId.toString(),
        type: 'UPVOTE'
      }
    })
  }

  async downvoteComment(commentId: Id, userId: Id) {
    const commentExists = await this.prismaORM.comments.findUnique({
      where: {
        id: commentId.toString()
      }
    })

    if (!commentExists) {
      throw new Error('Conteúdo não encontrado')
    }
    
    const userAlreadyDownvoteComment = await this.prismaORM.votes_comments.findFirst({
      where: {
        fk_user: userId.toString(),
        fk_comment: commentId.toString()
      }
    })

    if(userAlreadyDownvoteComment) {
      throw new Error('Você já reagiu a esse comentário')
    }

    await this.prismaORM.votes_comments.create({
      data: {
        fk_user: userId.toString(),
        fk_comment: commentId.toString(),
        type: 'DOWNVOTE'
      }
    })
  }

  async highlights(page: number) {
    const peerPage = 20
    const currentDate = new Date()
    const oneWeekAgo = new Date(currentDate.getTime() - 1000 * 60 * 60 * 24 * 7)

    const memes = await this.prismaORM.memes.findMany({
      take: peerPage,
      skip: Number(page - 1) * peerPage,
      include: {
        tags: true,
        likes: true,
        repubs: true,
        comments: true,
      },
      where: {
        created_at: {
          gte: oneWeekAgo,
        },
      },
      orderBy: [
        {
          repubs: {
            _count: 'desc',
          },
        },
      ],
    })

    const minimumCommentAverage = 10
    const minimumLikeAverage = 100

    const highlightedMemes = memes.filter((meme) => {
      const commentAverage = meme.comments.length / memes.length
      const likeAverage = meme.likes.length / memes.length

      return commentAverage >= minimumCommentAverage && likeAverage >= minimumLikeAverage
    })

    const m: Array<Meme> = []
    highlightedMemes.forEach(meme => {
      const tags: Array<{ name: string, weight: number }> = []
      meme.tags.forEach(({ name }) => {
        tags.push({ name, weight: 1 })
      })

      m.push(new Meme(
        new Id(meme.id),
        new Id(meme.fk_author),
        { uri: meme.content_uri },
        tags
      ))
    })

    return m
  }

  async collective(page: number) {
    const peerPage = 20
    const currentDate = new Date()
    const oneWeekAgo = new Date(currentDate.getTime() - 1000 * 60 * 60 * 24 * 14)

    const memes = await this.prismaORM.memes.findMany({
      take: peerPage,
      skip: Number(page - 1) * peerPage,
      include: {
        tags: true,
        likes: true,
      },
      where: {
        created_at: {
          gte: oneWeekAgo,
        },
      },
      orderBy: [
        {
          likes: {
            _count: 'desc',
          },
        },
      ],
    })

    const m: Array<Meme> = []
    memes.forEach(meme => {
      const tags: Array<{ name: string, weight: number }> = []
      meme.tags.forEach(({ name }) => {
        tags.push({ name, weight: 1 })
      })

      m.push(new Meme(
        new Id(meme.id),
        new Id(meme.fk_author),
        { uri: meme.content_uri },
        tags
      ))
    })

    return m
  }
}
