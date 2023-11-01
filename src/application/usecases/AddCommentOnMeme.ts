/* eslint-disable no-useless-constructor */

import Comment from '../../domain/Comment'
import Content from '../../domain/Content'
import Id from '../../domain/Id'
import CommentRepository from '../repositories/CommentRepository'
import MemeRepository from '../repositories/MemeRepository'

type Input = {
  memeId: string
  userId: string
  midiaId: string
  body: string
}

export class AddCommentOnMeme {
  constructor(
    readonly commentRepository: CommentRepository,
    readonly memeRepository: MemeRepository,
  ) {}

  async handle(input: Input): Promise<void> {
    const memeExist = await this.memeRepository.get(new Id(input.memeId))
    if (!memeExist) throw new Error('Conteúdo não encontrado')
    const isPossibleAddANewCommentInMeme = memeExist.getStatus().value
    if (isPossibleAddANewCommentInMeme !== 'visible') {
      throw new Error('Conteúdo não encontrado')
    }
    if (input.midiaId) {
      const isPossibleMarkTheMeme = await this.memeRepository.get(
        new Id(input.midiaId),
      )
      if (!isPossibleMarkTheMeme) throw new Error('Conteúdo não encontrado')
    }
    const comment = Comment.create(
      input.memeId,
      input.userId,
      new Content(input.body, input.midiaId),
    )
    await this.commentRepository.save(comment)
  }
}
