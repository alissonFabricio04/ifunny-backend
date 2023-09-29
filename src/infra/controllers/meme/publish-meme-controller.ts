import { PublishMemeUseCase } from "../../../usecases/meme/publish-meme-use-case"
import { MemeGatewayImpl } from "../../gateways/meme-gateway-impl"
import { Controller } from "../controller"

export class PublishMemeController implements Controller {
  async handle(body: any) {
    const useCase = new PublishMemeUseCase(
      new MemeGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        authorId: body.userId,
        content: body.content,
        tags: body.tags,
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    return new Response(null, { status: 201 })
  }
}
