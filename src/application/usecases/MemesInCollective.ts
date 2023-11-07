/* eslint-disable no-useless-constructor */

import MemeQuery from '../queries/MemeQuery'

type Input = {
  page?: number
}

type Output = {
  collective: {
    memeId: string
    authorId: string
    content: string
    tags: { name: string }[]
    upvotes: number
  }[]
}

export class MemesInCollective {
  constructor(readonly memeQuery: MemeQuery) {}

  async handle(input: Input): Promise<Output> {
    let page = Number(input.page)
    if (isNaN(page)) page = 1
    const collective = await this.memeQuery.collective(page)
    return {
      collective,
    }
  }
}
