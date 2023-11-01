import Id from '../../domain/Id'
import Folder from '../../domain/Folder'
import Name from '../../domain/Name'

export default interface FolderRepository {
  save: (folder: Folder) => Promise<void>
  get: (folderId: Id) => Promise<Folder>
  getAll: (userId: Id) => Promise<Folder[]>
  getByName: (userId: Id, folderName: Name) => Promise<Folder>
  update: (folder: Folder) => Promise<void>
}
