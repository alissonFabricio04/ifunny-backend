import { Id } from '../../domain/value-objects/id'
import { Comment } from '../../domain/entities/comment'
import { CommentRepository } from '../repositories/comment-repository'
import { UseCaseError } from './error/usecase-error'

interface Input {
  memeId: string
  page?: number
}

interface Output {
  comments: Array<Comment>
}

export class GetCommentsFromMemeUseCase {
  readonly commentRepository: CommentRepository

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository
  }

  async handle(input: Input): Promise<Output> {
    const memeId = new Id(input.memeId)

    const isPossibleGetCommentsOnMeme =
      await this.commentRepository.memeIsActive(memeId)

    if (!isPossibleGetCommentsOnMeme) {
      throw new UseCaseError('Conteúdo não encontrado')
    }

    let page = Number(input.page)
    if (isNaN(page)) {
      page = 1
    }

    const comments = await this.commentRepository.getAll(memeId, page)

    return {
      comments,
    }
  }
}
