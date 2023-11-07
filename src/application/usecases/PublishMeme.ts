/* eslint-disable no-useless-constructor */

import Meme from '../../domain/Meme'
import MemeRepository from '../repositories/MemeRepository'

type Input = {
  authorId: string
  content: string
  tags: {
    name: string
  }[]
}

type Output = {
  memeId: string
}

export default class PublishMeme {
  constructor(readonly memeRepository: MemeRepository) {}

  async handle(input: Input): Promise<Output> {
    const meme = Meme.create(input.authorId, input.content, input.tags)
    await this.memeRepository.save(meme)
    return {
      memeId: meme.memeId.getValue(),
    }
  }
}
