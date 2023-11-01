import { Id } from '../../domain/value-objects/id'
import { Folder } from '../../domain/entities/folder'

export interface FolderRepository {
  save: (folder: Folder) => Promise<void>
  get: (folderId: Id) => Promise<Folder>
  getByName: (userId: Id, folderName: string) => Promise<Folder>
  getAll: (userId: Id) => Promise<Folder[]>
  memeIsActive: (memeId: Id) => Promise<boolean>
  republishMeme: (memeId: Id, folderId: Id) => Promise<void>
}
