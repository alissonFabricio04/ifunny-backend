/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import Folder from '../../domain/Folder'
import FolderRepository from '../repositories/FolderRepository'
import Name from '../../domain/Name'

type Input = {
  userId: string
  folderName: string
  thumbnail?: string
}

export class CreateNewFolder {
  constructor(readonly folderRepository: FolderRepository) {}

  async handle(input: Input): Promise<void> {
    const ownerId = new Id(input.userId)
    const alreadyFolderWithThisName = await this.folderRepository.getByName(
      ownerId,
      new Name(input.folderName),
    )
    if (alreadyFolderWithThisName) {
      throw new Error('Você já possui uma pasta com esse nome')
    }
    const folder = Folder.create(
      input.folderName,
      ownerId.getValue(),
      input.thumbnail,
    )
    await this.folderRepository.save(folder)
  }
}
