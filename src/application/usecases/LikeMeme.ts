/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import MemeRepository from '../repositories/MemeRepository'

type Input = {
  userId: string
  memeId: string
}

export class LikeMeme {
  constructor(readonly memeRepository: MemeRepository) {}

  async handle(input: Input): Promise<void> {
    const memeId = new Id(input.memeId)
    const isPossibleLikeThisMeme = await this.memeRepository.get(memeId)
    if (!isPossibleLikeThisMeme) throw new Error('Conteúdo não encontrado')
    const userId = new Id(input.userId)
    const alreadyLikedMeme = await this.memeRepository.alreadyLikeMeme(
      memeId,
      userId,
    )
    if (alreadyLikedMeme) throw new Error('Você já deu like neste meme')
    isPossibleLikeThisMeme.upvote()
    await this.memeRepository.updateVotes(userId, isPossibleLikeThisMeme)
  }
}
