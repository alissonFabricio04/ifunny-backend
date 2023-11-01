import { Id } from '../../domain/value-objects/id'
import { MemeRepository } from '../repositories/meme-repository'
import { UseCaseError } from './error/usecase-error'

interface Input {
  userId: string
  memeId: string
}

export class DeslikeMemeUseCase {
  readonly memeRepository: MemeRepository

  constructor(memeRepository: MemeRepository) {
    this.memeRepository = memeRepository
  }

  async handle(input: Input): Promise<void> {
    const memeId = new Id(input.memeId)
    const userId = new Id(input.userId)
    const isPossibleDeslikeThisMeme = await this.memeRepository.get(memeId)

    if (!isPossibleDeslikeThisMeme) {
      throw new UseCaseError('Conteúdo não encontrado')
    }

    const alreadyDeslikedMeme = await this.memeRepository.alreadyReactMeme(
      memeId,
      userId,
      {
        type: 'DESLIKE',
      },
    )

    if (alreadyDeslikedMeme) {
      throw new UseCaseError('Você já deu deslike neste meme')
    }

    isPossibleDeslikeThisMeme.downvote()

    await this.memeRepository.update(isPossibleDeslikeThisMeme)
  }
}
