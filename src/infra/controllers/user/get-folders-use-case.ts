import { GetFoldersUseCase } from "../../../usecases/user/get-folders-use-case"
import { UserGatewayImpl } from "../../gateways/user-gateway-impl"
import { Controller } from "../controller"

export class GetFoldersController implements Controller {
  async handle(body: any) {
    const useCase = new GetFoldersUseCase(
      new UserGatewayImpl(),
    )

    const { status, data } = await useCase.handle({
      data: {
        userId: body.userId
      },
    })
    if (status !== 'SUCCESS') {
      return new Response(null, { status: 500 })
    }

    const folders: Array<{ id: string, folderName: string }> = []
    data.folders.forEach(({ id, folderName }) => folders.push({ id: id.toString(), folderName }))

    return new Response(JSON.stringify(folders), { status: 200 })
  }
}
