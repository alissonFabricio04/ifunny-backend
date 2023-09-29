import { RepubMemeUseCase } from "../../../usecases/user/repub-meme-use-case"
import { UserGatewayImpl } from "../../gateways/user-gateway-impl"
import { Controller } from "../controller"

export class RepubMemeController implements Controller {
  async handle(body: any) {
    const useCase = new RepubMemeUseCase(
      new UserGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        userId: body.userId,
        folderId: body.folderId,
        memeId: body.memeId
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    return new Response(null, { status: 200 })
  }
}
