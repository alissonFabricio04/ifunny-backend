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
  
  async find(memeId: Id) {
    const meme = await this.prismaORM.memes.findUnique({
      where: {
        id: memeId.toString()
      },
      include: {
        tags: true
      }
    })
    
    if(!meme) {
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
    
    async memesInLast1h(qty: number) {
      const back1h = new Date()
      back1h.setHours(back1h.getHours() - 1)
      
      const memes = await this.prismaORM.memes.findMany({
        take: qty,
      include: {
        tags: true
      },
      where: {
        created_at: {
          lte: back1h
        }
      }
    })

    console.log(memes)
    
    const m: Array<Meme> = []
    memes.forEach(meme => {
      const tags: Array<{ name: string, weight: number }> = []
      meme.tags.forEach(({ name, weight }) => {
        tags.push({ name, weight: weight.toNumber() })
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
          tags.push({ name, weight: weight.toNumber() })
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
  }
  