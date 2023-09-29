import { Email } from '../../entities/email/model/email-value-object'
import { Id } from '../../entities/id/model/id-value-object'
import { Meme } from '../../entities/meme/model/meme'
import { UserGateway } from '../../entities/user/gateways/user-gateway'
import { User } from '../../entities/user/model/user'
import { prismaORM } from '../config/prisma-config'

export class UserGatewayImpl implements UserGateway {
  readonly prismaORM = prismaORM
  
  async save(user: User) {
    await this.prismaORM.users.create({
      data: {
        id: user.id.toString(),
        username: user.username,
        email: user.email.toString(),
        password: user.password || '',
      },
    })
  }
  
  async find(username: string) {
    const userExists = await this.prismaORM.users.findUnique({
      where: {
        username,
      },
    })
    
    if (!userExists) {
      return null
    }
    
    return new User(
      new Id(userExists.id),
      userExists.username,
      new Email(userExists.email),
      userExists.is_active,
      userExists.password
      )
    }
    
    async alreadyFolderWithThisName(userId: Id, folderName: string) {
      const f = await this.prismaORM.folders.findFirst({
        where: {
          fk_owner: userId.toString(),
          folderName,
        }
      })
      
      if(f) {
        return true
      }
      
      return false
    }
    
    async createFolder(userId: Id, folderId: Id, folderName: string) {
      await this.prismaORM.folders.create({
        data: {
          id: folderId.toString(),
          fk_owner: userId.toString(),
          folderName: folderName
        }
      })
    }
    
    async folderExists(folderId: Id) {
      const f = await this.prismaORM.folders.findFirst({
        where: {
          id: folderId.toString()
        }
      })
      
    if(f) {
      return true
    }
    
    return false
  }
  
  async repubMeme(folderId: Id, memeId: Id) {
    await this.prismaORM.repubs.create({
      data: {
        fk_folder: folderId.toString(),
        fk_meme: memeId.toString()
      }
    })
  }

  async getFolders(userId: Id) {
    const f = await this.prismaORM.folders.findMany({
      where: {
        fk_owner: userId.toString()
      }
    })

    const folders: Array<{ id: Id; folderName: string }> = []
    f.forEach(folder => folders.push({ id: new Id(folder.id), folderName: folder.folderName }))

    return folders
  }

  async getMemeInFolder(folderId: Id) {
    const m = await this.prismaORM.folders.findUnique({
      include: {
        repubs: {
          include: {
            meme: {
              include: {
                tags: true
              }
            }
          }
        }
      },
      where: {
        id: folderId.toString()
      }
    })

    const memes: Array<Meme> = []
    m?.repubs.forEach(({ meme }) => {
      const tags: Array<{ name: string, weight: number }> = []
      meme.tags.forEach(({ name, weight }) => tags.push({ name, weight: 1 }))

      memes.push(new Meme(
        new Id(meme.id),
        new Id(meme.fk_author),
        {
          uri: meme.content_uri
        },
        tags
      ))
    })

    return memes
  }
}
