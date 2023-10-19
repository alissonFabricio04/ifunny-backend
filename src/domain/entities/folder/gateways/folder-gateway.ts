import { Id } from '../../../value-objects/id/model/id-value-object'
import { Folder } from '../model/folder'

export interface FolderGateway {
  save: (userId: Id, folder: Folder) => Promise<void>
  find: (folderId: Id) => Promise<Folder>
  findAll: (userId: Id) => Promise<Folder[]>
  alreadyFolderWithThisName: (userId: Id, folderName: string) => Promise<boolean>
  repubMeme: (folderId: Id, memeId: Id) => Promise<void>
}
