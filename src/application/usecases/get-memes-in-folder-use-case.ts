import { Id } from '../../domain/value-objects/id'
import { Meme } from '../../domain/entities/meme'
import { MemeRepository } from '../repositories/meme-repository'

interface Input {
  folderId: string
}

interface Output {
  memes: Array<Meme>
}

export class GetMemesInFolderUseCase {
  readonly memeRepository: MemeRepository

  constructor(memeRepository: MemeRepository) {
    this.memeRepository = memeRepository
  }

  async handle(input: Input): Promise<Output> {
    const folderId = new Id(input.folderId)
    const memes = await this.memeRepository.getMemeInFolder(folderId)

    return {
      memes,
    }
  }
}
