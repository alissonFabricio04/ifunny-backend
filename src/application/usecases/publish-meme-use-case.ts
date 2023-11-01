import { Id } from '../../domain/value-objects/id'
import { Meme, Tag } from '../../domain/entities/meme'
import { Midia } from '../../domain/value-objects/midia'
import { MemeRepository } from '../repositories/meme-repository'
import { UseCaseError } from './error/usecase-error'

interface Input {
  authorId: string
  content: string
  tags: {
    name: string
  }[]
}

export class PublishMemeUseCase {
  readonly memeRepository: MemeRepository

  constructor(memeRepository: MemeRepository) {
    this.memeRepository = memeRepository
  }

  async handle(input: Input): Promise<void> {
    const tags: Tag[] = []
    input.tags.forEach((tag) => tags.push({ name: tag.name, weight: 1 }))

    const meme = Meme.create(
      new Id(input.authorId),
      new Midia(input.content),
      tags,
    )

    const contentAlreadyRegistered = await this.memeRepository.get(meme.getId())

    if (contentAlreadyRegistered) {
      throw new UseCaseError('Esse conteúdo já está em uso')
    }

    await this.memeRepository.save(meme)
  }
}
