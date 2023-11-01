import { Id } from '../../domain/value-objects/id'
import { FolderRepository } from '../repositories/folder-repository'
import { UseCaseError } from './error/usecase-error'

interface Input {
  folderId: string
  memeId: string
}

export class RepublishMemeUseCase {
  readonly folderRepository: FolderRepository

  constructor(folderRepository: FolderRepository) {
    this.folderRepository = folderRepository
  }

  async handle(input: Input): Promise<void> {
    const memeId = new Id(input.memeId)
    const folderId = new Id(input.folderId)

    const isPossibleSaveThisMeme = await this.folderRepository.memeIsActive(
      memeId,
    )

    if (!isPossibleSaveThisMeme) {
      throw new UseCaseError('Conteudo não encontrado')
    }

    const folderExists = await this.folderRepository.get(folderId)

    if (!folderExists) {
      throw new UseCaseError('Você não possui uma pasta com esse nome')
    }

    await this.folderRepository.republishMeme(folderId, memeId)
  }
}
