import { Id } from '../../id/model/id-value-object'
import { Meme } from '../../meme/model/meme'
import { User } from '../model/user'

export interface UserGateway {
  save: (user: User) => Promise<void>
  find: (username: string) => Promise<User | null>
  alreadyFolderWithThisName: (userId: Id, folderName: string) => Promise<boolean>
  createFolder: (userId: Id, folderId: Id, folderName: string) => Promise<void>
  folderExists: (folderId: Id) => Promise<boolean>
  getFolders: (userId: Id) => Promise<Array<{ id: Id, folderName: string }>>
  getMemeInFolder: (folderId: Id) => Promise<Array<Meme>>
  repubMeme: (folderId: Id, memeId: Id) => Promise<void>
}
