/* eslint-disable @typescript-eslint/ban-types */

import { Id } from '../../domain/value-objects/id/model/id-value-object'
import { FolderGateway } from '../../domain/entities/folder/gateways/folder-gateway'
import { UseCase, InDTO, OutDTO } from '../user-case'
import { CreateNewFolderUseCase } from './create-new-folder-use-case'

interface InputDTO {
  userId: string
  folderId: string
  memeId: string
}

interface OutputDTO {}

export class RepubMemeUseCase
  implements UseCase<FolderGateway, InputDTO, OutputDTO>
{
  readonly gateway: FolderGateway

  constructor(gateway: FolderGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    let folderId: Id

    if(!inputDTO.data.folderId) {
      const userId = new Id(inputDTO.data.userId ?? 'failed')
      const gfolderId = new Id()

      const createNewFolderUseCase = new CreateNewFolderUseCase(this.gateway)
      await createNewFolderUseCase.handle({
        data: {
          folderId: gfolderId.toString(),
          folderName: 'Repubs',
          userId: userId.toString()
        }
      })

      folderId = gfolderId
    } else {
      folderId = new Id(inputDTO.data.folderId)
    }

    const memeId = new Id(inputDTO.data.memeId ?? 'failed')

    const folderExists = await this.gateway.find(folderId)

    if(!folderExists) {
      throw new Error('Você não possui uma pasta com esse nome')
    }

    await this.gateway.repubMeme(folderId, memeId)

    return {
      status: 'SUCCESS',
      data: {},
    }
  }
}
