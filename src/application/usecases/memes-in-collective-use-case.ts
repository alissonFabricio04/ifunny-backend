import { Meme } from '../../domain/entities/meme'
import { MemeRepository } from '../repositories/meme-repository'

interface Input {
  page?: number
}

interface Output {
  memes: Array<Meme>
}

export class MemesInCollectiveUseCase {
  readonly memeRepository: MemeRepository

  constructor(memeRepository: MemeRepository) {
    this.memeRepository = memeRepository
  }

  async handle(input: Input): Promise<Output> {
    let page = Number(input.page)
    if (isNaN(page)) {
      page = 1
    }

    const memes = await this.memeRepository.collective(page)

    return {
      memes,
    }
  }
}
