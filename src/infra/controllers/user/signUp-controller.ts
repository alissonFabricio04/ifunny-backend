import { SignUpUseCase } from '../../../usecases/user/signUp-use-case'
import { NotificationAdapterImpl } from '../../adapters/notification/email/notification-adapter-impl'
import { UserGatewayImpl } from '../../gateways/user-gateway-impl'
import { SignUpPresenterWeb } from '../../presenters/user/web/signIn-presenter-web'

export class SignUpController {
  static async handle(req: Request, response: Response) {
    const useCase = new SignUpUseCase(
      new UserGatewayImpl(),
      new NotificationAdapterImpl(),
    )
    const presenter = SignUpPresenterWeb.handle

    presenter(
      useCase.handle({
        data: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          passwordAgain: req.body.passwordAgain,
        },
      }),
    )
  }
}
