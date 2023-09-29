import { LikeMemeUseCase } from "../../../usecases/meme/like-meme-use-case"
import { MemeGatewayImpl } from "../../gateways/meme-gateway-impl"
import { Controller } from "../controller"

export class LikeMemeController implements Controller {
  async handle(body: any) {
    const useCase = new LikeMemeUseCase(
      new MemeGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        userId: body.userId,
        memeId: body.memeId
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    return new Response(null, { status: 204 })
  }
}
