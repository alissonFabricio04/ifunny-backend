import { Id } from '../../id/model/id-value-object'
import { User } from '../model/user'

export interface UserGateway {
  save: (user: User) => Promise<void>
  find: (username: string) => Promise<User | null>
  alreadyFolderWithThisName: (userId: Id, folderName: string) => Promise<boolean>
  createFolder: (userId: Id, folderName: string) => Promise<void>
}
