/* eslint-disable @typescript-eslint/ban-types */

import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { UserGateway } from '../../entities/user/gateways/user-gateway'
import { InDTO, OutDTO, UseCase } from '../user-case'
import { NotificationAdapter } from '../../adapters/notification-adapter'
import { UserNotFoundError } from './errors/user-not-found-error'
import { PasswordIncorrect } from './errors/password-incorrect-error'

interface InputDTO {
  username: string
  password: string
}

interface OutputDTO {
  token: string
}

export class SignInUseCase
  implements UseCase<UserGateway, InputDTO, OutputDTO | {}>
{
  readonly gateway: UserGateway
  readonly notificationAdapter: NotificationAdapter<string>

  constructor(
    gateway: UserGateway,
    notificationAdapter: NotificationAdapter<string>,
  ) {
    this.gateway = gateway
    this.notificationAdapter = notificationAdapter
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO | {}>> {
    const userExists = await this.gateway.find(inputDTO.data.username)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    if (!(await compare(inputDTO.data.password, userExists.password || ''))) {
      throw new PasswordIncorrect()
    }

    let tokenForSignIn
    try {
      tokenForSignIn = sign(
        {
          id: userExists.id.toString(),
        },
        Bun.env.JWT_SECRET || '',
        {
          expiresIn: '6h',
        },
      )
    } catch (e) {
      return {
        status: 'ERROR',
        data: {},
      }
    }

    return {
      status: 'SUCCESS',
      data: {
        token: tokenForSignIn,
      },
    }
  }
}
