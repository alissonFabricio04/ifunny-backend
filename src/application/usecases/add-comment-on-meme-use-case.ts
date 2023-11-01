import { Id } from '../../domain/value-objects/id'
import { Comment } from '../../domain/entities/comment'
import { CommentRepository } from '../repositories/comment-repository'
import { UseCaseError } from './error/usecase-error'

interface Input {
  memeId: string
  authorId: string
  content: {
    midia?: {
      postId: string
    }
    text?: string
  }
}

export class AddCommentOnMemeUseCase {
  readonly commentRepository: CommentRepository

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository
  }

  async handle(input: Input): Promise<void> {
    const isPossibleAddANewCommentInMeme =
      await this.commentRepository.memeIsActive(new Id(input.memeId))

    if (!isPossibleAddANewCommentInMeme) {
      throw new UseCaseError('Conteúdo não encontrado')
    }

    let midia
    let text

    if (input?.content?.midia && typeof input?.content?.midia !== 'object') {
      throw new UseCaseError(
        'Não é possivel marcar mais de um conteúdo em um comentario',
      )
    }

    if (input?.content?.midia?.postId) {
      midia = {
        postId: new Id(input.content.midia?.postId),
      }

      const isPossibleMarkMemeInComment =
        await this.commentRepository.memeIsActive(midia.postId)

      if (!isPossibleMarkMemeInComment) {
        throw new UseCaseError('Conteúdo não encontrado')
      }
    }

    if (input?.content?.text) {
      text = input.content.text
    }

    const comment = Comment.create(
      new Id(input.memeId),
      new Id(input.authorId),
      {
        midia,
        text,
      },
    )

    await this.commentRepository.save(comment)
  }
}
