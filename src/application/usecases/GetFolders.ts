/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import { FolderQuery } from '../queries/FolderQuery'

type Input = {
  userId: string
}

type Output = {
  folders: {
    folderId: string
    name: string
    ownerId: string
    thumbnail: string
  }[]
}

export class GetFolders {
  constructor(readonly folderQuery: FolderQuery) {}

  async handle(input: Input): Promise<Output> {
    const userId = new Id(input.userId)
    const folders = await this.folderQuery.getAll(userId)
    return {
      folders,
    }
  }
}
