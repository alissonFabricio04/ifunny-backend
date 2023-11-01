import { Id } from '../../domain/value-objects/id'
import { MemeRepository } from '../repositories/meme-repository'
import { UseCaseError } from './error/usecase-error'

interface Input {
  userId: string
  memeId: string
}

export class LikeMemeUseCase {
  readonly memeRepository: MemeRepository

  constructor(memeRepository: MemeRepository) {
    this.memeRepository = memeRepository
  }

  async handle(input: Input): Promise<void> {
    const memeId = new Id(input.memeId)
    const userId = new Id(input.userId)
    const isPossibleLikeThisMeme = await this.memeRepository.get(memeId)

    if (!isPossibleLikeThisMeme) {
      throw new UseCaseError('Conteúdo não encontrado')
    }

    const alreadyLikedMeme = await this.memeRepository.alreadyReactMeme(
      memeId,
      userId,
      {
        type: 'LIKE',
      },
    )

    if (alreadyLikedMeme) {
      throw new UseCaseError('Você já deu like neste meme')
    }

    isPossibleLikeThisMeme.upvote()

    await this.memeRepository.update(isPossibleLikeThisMeme)
  }
}
