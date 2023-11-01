/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import FolderRepository from '../repositories/FolderRepository'
import MemeRepository from '../repositories/MemeRepository'

type Input = {
  folderId: string
  memeId: string
}

export class RepublishMeme {
  constructor(
    readonly folderRepository: FolderRepository,
    readonly memeRepository: MemeRepository,
  ) {}

  async handle(input: Input): Promise<void> {
    const memeId = new Id(input.memeId)
    const isPossibleRepubThisMeme = await this.memeRepository.get(memeId)
    if (!isPossibleRepubThisMeme) throw new Error('Conteudo não encontrado')
    const folderId = new Id(input.folderId)
    const folderExists = await this.folderRepository.get(folderId)
    if (!folderExists) {
      throw new Error('Você não possui uma pasta com esse nome')
    }
    folderExists.repub(memeId.getValue())
    await this.folderRepository.update(folderExists)
  }
}
