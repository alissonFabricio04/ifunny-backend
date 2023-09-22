import { Id } from "../../entities/id/model/id-value-object"
import { MemeGateway } from "../../entities/meme/gateways/meme-gateway"
import { Comment } from "../../entities/meme/model/comment"
import { Meme } from "../../entities/meme/model/meme"
import { UseCase, DTO } from "../user-case"


interface InputDTO {
  memeId: string
  authorId: string
  content: {
    midia?: {
      postId: string
    },
    text?: string
  }
}

interface OutputDTO {}

export class PublishMemeUseCase implements UseCase<MemeGateway, InputDTO, OutputDTO> {
  constructor(
    readonly gateway: MemeGateway
  ) {}

  async handle(inputDTO: DTO<InputDTO>): Promise<DTO<OutputDTO>> {
    let midia;
    let text;

    if(inputDTO.data.content.midia?.postId) {
      midia = {
        postId: new Id(inputDTO.data.content.midia?.postId)
      }
    }

    if(inputDTO.data.content.text) {
      text = inputDTO.data.content.text
    }

    const comment = new Comment(
      new Id(),
      new Id(inputDTO.data.memeId),
      new Id(inputDTO.data.authorId),
      {
        midia,
        text
      }
    )

    await this.gateway.addComment(new Id(inputDTO.data.memeId), comment)

    return {
      status: 'SUCCESS',
      data: {}
    }
  }
}