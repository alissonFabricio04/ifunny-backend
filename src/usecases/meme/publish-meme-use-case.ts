import { Id } from "../../entities/id/model/id-value-object"
import { MemeGateway } from "../../entities/meme/gateways/meme-gateway"
import { Meme } from "../../entities/meme/model/meme"
import { UseCase, DTO } from "../user-case"


interface InputDTO {
  authorId: string
  content: string
  tags: Array<string>
}

interface OutputDTO {}

export class PublishMemeUseCase implements UseCase<MemeGateway, InputDTO, OutputDTO> {
  constructor(
    readonly gateway: MemeGateway
  ) {}

  async handle(inputDTO: DTO<InputDTO>): Promise<DTO<OutputDTO>> {
    const meme = new Meme(
      new Id(),
      new Id(inputDTO.data.authorId),
      { uri: inputDTO.data.content },
      []
    )

    inputDTO.data.tags.forEach(tag => {
      meme.addTag({ name: tag })
    })

    await this.gateway.publish(meme)

    return {
      status: 'SUCCESS',
      data: {}
    }
  }
}