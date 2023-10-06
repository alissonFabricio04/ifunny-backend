import { DownvoteCommentUseCase } from "../../../usecases/meme/downvote-comment-use-case"
import { MemeGatewayImpl } from "../../gateways/meme-gateway-impl"
import { Controller } from "../controller"

export class DownvoteCommentController implements Controller {
  async handle(body: any) {
    const useCase = new DownvoteCommentUseCase(
      new MemeGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        commentId: body.commentId,
        userId: body.userId,
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    return new Response(null, { status: 201 })
  }
}
