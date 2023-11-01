import { Id } from '../../domain/value-objects/id'
import { Folder } from '../../domain/entities/folder'
import { FolderRepository } from '../repositories/folder-repository'
import { UseCaseError } from './error/usecase-error'

interface Input {
  userId: string
  folderName: string
  thumbnail?: string
}

export class CreateNewFolderUseCase {
  readonly folderRepository: FolderRepository

  constructor(folderRepository: FolderRepository) {
    this.folderRepository = folderRepository
  }

  async handle(input: Input): Promise<void> {
    const ownerId = new Id(input.userId)

    const alreadyFolderWithThisName = await this.folderRepository.getByName(
      ownerId,
      input.folderName,
    )

    if (alreadyFolderWithThisName) {
      throw new UseCaseError('Você já possui uma pasta com esse nome')
    }

    const folder = Folder.create(input.folderName, ownerId, input.thumbnail)

    await this.folderRepository.save(folder)
  }
}
