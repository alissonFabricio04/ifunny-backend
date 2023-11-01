/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import Meme from '../../domain/Meme'
import Midia from '../../domain/Midia'
import Tag from '../../domain/Tag'
import MemeRepository from '../repositories/MemeRepository'

type Input = {
  authorId: string
  content: string
  tags: {
    name: string
  }[]
}

export class PublishMeme {
  constructor(readonly memeRepository: MemeRepository) {}

  async handle(input: Input): Promise<void> {
    const tags = input.tags.map((tag) => new Tag(tag.name))
    const meme = Meme.create(
      new Id(input.authorId),
      new Midia(input.content),
      tags,
    )
    await this.memeRepository.save(meme)
  }
}
