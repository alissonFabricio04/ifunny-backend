/* eslint-disable @typescript-eslint/no-empty-interface */

import { Id } from '../../entities/id/model/id-value-object'
import { MemeGateway } from '../../entities/meme/gateways/meme-gateway'
import { Comment } from '../../entities/meme/model/comment'
import { InDTO, OutDTO, UseCase } from '../user-case'

interface InputDTO {
  memeId: string
  authorId: string
  content: {
    midia?: {
      postId: string
    }
    text?: string
  }
}

interface OutputDTO { }

export class AddCommentUseCase
  implements UseCase<MemeGateway, InputDTO, OutputDTO>
{
  readonly gateway: MemeGateway

  constructor(gateway: MemeGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const memeExists = await this.gateway.find(new Id(inputDTO.data.memeId))

    if (!memeExists) {
      throw new Error('Conteúdo não encontrado')
    }

    let midia
    let text

    if (inputDTO.data?.content?.midia && typeof inputDTO.data?.content?.midia !== 'object') {
      throw new Error('Não é possivel marcar mais de um conteúdo em um comentario')
    }

    if (inputDTO.data?.content?.midia?.postId) {
      midia = {
        postId: new Id(inputDTO.data.content.midia?.postId),
      }

      const repubMemeIdExists = await this.gateway.find(midia.postId)

      if (!repubMemeIdExists) {
        throw new Error('Conteúdo não encontrado')
      }
    }

    if (inputDTO.data?.content?.text) {
      text = inputDTO.data.content.text
    }

    const comment = new Comment(
      new Id(),
      new Id(inputDTO.data.memeId),
      new Id(inputDTO.data.authorId),
      {
        midia,
        text,
      },
    )

    await this.gateway.addComment(new Id(inputDTO.data.memeId), comment)

    return {
      status: 'SUCCESS',
      data: {},
    }
  }
}
