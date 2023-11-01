/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import MemeRepository from '../repositories/MemeRepository'

type Input = {
  userId: string
  memeId: string
}

export class DislikeMeme {
  constructor(readonly memeRepository: MemeRepository) {}

  async handle(input: Input): Promise<void> {
    const memeId = new Id(input.memeId)
    const isPossibleDislikeThisMeme = await this.memeRepository.get(memeId)
    if (!isPossibleDislikeThisMeme) throw new Error('Conteúdo não encontrado')
    const userId = new Id(input.userId)
    const alreadyDislikedMeme = await this.memeRepository.alreadyDislikeMeme(
      memeId,
      userId,
    )
    if (alreadyDislikedMeme) throw new Error('Você já deu dislike neste meme')
    isPossibleDislikeThisMeme.downvote()
    await this.memeRepository.updateVotes(userId, isPossibleDislikeThisMeme)
  }
}
