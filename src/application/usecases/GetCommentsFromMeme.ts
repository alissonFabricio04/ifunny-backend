/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import { CommentQuery } from '../queries/CommentQuery'
import MemeRepository from '../repositories/MemeRepository'

type Input = {
  memeId: string
  page?: number
}

type Output = {
  comments: {
    commentId: string
    authorId: string
    content: {
      body: string
      midiaId: string
    }
    upvotes: number
  }[]
}

export class GetCommentsFromMeme {
  constructor(
    readonly memeRepository: MemeRepository,
    readonly commentQuery: CommentQuery,
  ) {}

  async handle(input: Input): Promise<Output> {
    const memeId = new Id(input.memeId)
    const isPossibleGetCommentsOnMeme = await this.memeRepository.get(memeId)
    if (!isPossibleGetCommentsOnMeme) throw new Error('Conteúdo não encontrado')
    let page = Number(input.page)
    if (isNaN(page)) page = 1
    const comments = await this.commentQuery.getAll(memeId, page)
    return {
      comments,
    }
  }
}
