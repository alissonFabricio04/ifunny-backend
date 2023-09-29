import { AddCommentUseCase } from "../../../usecases/meme/add-comment-use-case"
import { MemeGatewayImpl } from "../../gateways/meme-gateway-impl"
import { Controller } from "../controller"

export class AddCommentController implements Controller {
  async handle(body: any) {
    const useCase = new AddCommentUseCase(
      new MemeGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        memeId: body.memeId,
        authorId: body.userId,
        content: body.content
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    return new Response(null, { status: 201 })
  }
}
