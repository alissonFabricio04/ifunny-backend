/* eslint-disable no-useless-constructor */

import { MemeQuery } from '../queries/MemeQuery'

type Input = {
  page?: number
}

type Output = {
  highlights: {
    memeId: string
    authorId: string
    content: string
    tags: { name: string }[]
    upvotes: number
  }[]
}

export class MemesInHighlights {
  constructor(readonly memeQuery: MemeQuery) {}

  async handle(input: Input): Promise<Output> {
    let page = Number(input.page)
    if (isNaN(page)) page = 1
    const highlights = await this.memeQuery.highlights(page)
    return {
      highlights,
    }
  }
}
