import { Meme } from '../../domain/entities/meme'
import { MemeRepository } from '../repositories/meme-repository'

interface Input {
  page?: number
}

interface Output {
  highlights: Array<Meme>
}

export class MemesInHighlightsUseCase {
  readonly memeRepository: MemeRepository

  constructor(memeRepository: MemeRepository) {
    this.memeRepository = memeRepository
  }

  async handle(input: Input): Promise<Output> {
    let page = Number(input.page)
    if (isNaN(page)) {
      page = 1
    }

    const highlights = await this.memeRepository.highlights(page)

    return {
      highlights,
    }
  }
}
