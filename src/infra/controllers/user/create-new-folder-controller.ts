import { CreateNewFolderUseCase } from "../../../usecases/user/create-new-folder-use-case"
import { UserGatewayImpl } from "../../gateways/user-gateway-impl"
import { Controller } from "../controller"

export class CreateNewFolderController implements Controller {
  async handle(body: any) {
    const useCase = new CreateNewFolderUseCase(
      new UserGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        userId: body.userId,
        folderName: body.folderName
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    return new Response(null, { status: 201 })
  }
}
