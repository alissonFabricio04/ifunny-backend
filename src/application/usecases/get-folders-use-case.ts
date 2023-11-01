import { Id } from '../../domain/value-objects/id'
import { Folder } from '../../domain/entities/folder'
import { FolderRepository } from '../repositories/folder-repository'

interface Input {
  userId: string
}

interface Output {
  folders: Folder[]
}

export class GetFoldersUseCase {
  readonly folderRepository: FolderRepository

  constructor(folderRepository: FolderRepository) {
    this.folderRepository = folderRepository
  }

  async handle(input: Input): Promise<Output> {
    const userId = new Id(input.userId)
    const folders = await this.folderRepository.getAll(userId)

    return {
      folders,
    }
  }
}
