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
          weight: tag.weight,
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
        fk_author: comment.authorId.toString()
      }
    })

    await this.prismaORM.comments_meme.create({
      data: {
        fk_author: comment.authorId.toString(),
        fk_comment: comment.id.toString(),
        fk_meme: comment.memeId.toString()
      }
    })
  }

  async getComments(memeId: Id, page: number) {
    const peerPage = 20
    const c = await this.prismaORM.comments_meme.findMany({
      take: peerPage,
      skip: Number(page - 1) * peerPage,
      include: {
        comment: {
          include: {
            repub: true
          }
        }
      },
      where: {
        fk_meme: memeId.toString()
      }
    })

    const comments: Array<Comment> = []
    
    c.forEach(comment => {
      const midia = comment.comment.fk_repub !== null ? 
        { postId: new Id(comment.comment.fk_repub) } :
        undefined

      comments.push(new Comment(
        new Id(comment.id),
        new Id(comment.fk_meme),
        new Id(comment.fk_author),
        {
          midia,
          text: comment.comment.text !== null ? comment.comment.text : undefined
        }
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
    meme.tags.forEach(({ name, weight }) => {
      tags.push({ name, weight: weight.toNumber() })
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
      meme.tags.forEach(({ name, weight }) => {
        tags.push({ name, weight: weight.toNumber() })
        // tags.push({ name, weight: 1 })
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
      meme.meme.tags.forEach(({ name, weight }) => {
        // tags.push({ name, weight: weight.toNumber() })
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

    if(m) {
      return true
    }

    return false
  }
}
