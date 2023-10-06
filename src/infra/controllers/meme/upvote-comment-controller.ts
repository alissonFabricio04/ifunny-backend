import { UpvoteCommentUseCase } from "../../../usecases/meme/upvote-comment-use-case"
import { MemeGatewayImpl } from "../../gateways/meme-gateway-impl"
import { Controller } from "../controller"

export class UpvoteCommentController implements Controller {
  async handle(body: any) {
    const useCase = new UpvoteCommentUseCase(
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
