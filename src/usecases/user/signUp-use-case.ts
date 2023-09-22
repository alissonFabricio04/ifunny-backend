import { isDeepStrictEqual } from "node:sys";
import { Email } from "../../entities/email/model/email-value-object";
import { Id } from "../../entities/id/model/id-value-object";
import { UserGateway } from "../../entities/user/gateways/user-gateway";
import { User } from "../../entities/user/model/user";
import { DTO, UseCase } from "../user-case";
import { PasswordsAreDifferentError } from "./errors/passwords-are-different-error";
import { NotificationAdapter } from "../../adapters/notification-adapter";
import { sign } from "jsonwebtoken"

interface InputDTO {
  username: string
  email: string
  password: string
  passwordAgain: string
}

interface OutputDTO {}

export class SignUpUseCase implements UseCase<UserGateway, InputDTO, OutputDTO> {
  constructor(
    readonly gateway: UserGateway,
    readonly notificationAdapter: NotificationAdapter<string>
  ) {}

  async handle(inputDTO: DTO<InputDTO>): Promise<DTO<OutputDTO>> {
    if(!isDeepStrictEqual(inputDTO.data.password, inputDTO.data.passwordAgain)) {
      throw new PasswordsAreDifferentError()
    }

    const user = new User(
      new Id(),
      inputDTO.data.username,
      new Email(inputDTO.data.email),
      false,
      inputDTO.data.password
    )

    const tokenForValidateEmail = sign(
      {
        id: user.id.toString(),
      }, 
      Bun.env.JWT_SECRET || '',
      {
        expiresIn: '1h'
      }
    )

    await this.gateway.save(user)
    await this.notificationAdapter.send(user, 'Validação de e-mail', {
      body: `
        Olá,
        Para validar seu e-mail, <a href="${Bun.env.SELF_URL}/validate-email/${tokenForValidateEmail}">clique aqui</a>
      `
    })

    return {
      status: 'SUCCESS',
      data: {}
    }
  }
}