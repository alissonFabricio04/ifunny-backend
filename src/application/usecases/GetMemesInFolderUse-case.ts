/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import { FolderQuery } from '../queries/FolderQuery'

type Input = {
  folderId: string
}

type Output = {
  memes: {
    memeId: string
    authorId: string
    content: string
    tags: { name: string }[]
    upvotes: number
  }[]
}

export class GetMemesInFolder {
  constructor(readonly folderQuery: FolderQuery) {}

  async handle(input: Input): Promise<Output> {
    const folderId = new Id(input.folderId)
    const memes = await this.folderQuery.getMemeInFolder(folderId)
    return {
      memes,
    }
  }
}
