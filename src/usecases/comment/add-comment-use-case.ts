/* eslint-disable @typescript-eslint/no-empty-interface */

import { Id } from '../../domain/value-objects/id/model/id-value-object'
import { CommentGateway } from '../../domain/entities/comment/gateways/comment-gateway'
import { Comment } from '../../domain/entities/comment/model/comment'
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
  implements UseCase<CommentGateway, InputDTO, OutputDTO>
{
  readonly gateway: CommentGateway

  constructor(gateway: CommentGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const memeExists = await this.gateway.postExists(new Id(inputDTO.data.memeId))

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
