import { describe, beforeEach, jest, expect, test } from 'bun:test'

import { NotificationAdapter } from '../../../src/adapters/notification-adapter'
import { Email } from '../../../src/entities/email/model/email-value-object'
import { Id } from '../../../src/entities/id/model/id-value-object'
import { UserGateway } from '../../../src/entities/user/gateways/user-gateway'
import { User } from '../../../src/entities/user/model/user'
import { SignUpUseCase } from '../../../src/usecases/user/signUp-use-case'

describe('Suite test for testing sign up use case', () => {
  let user: User
  let gateway: UserGateway
  let notificationAdapter: NotificationAdapter<string>
  let signUpUseCase: SignUpUseCase

  beforeEach(() => {
    user = new User(
      new Id('d262ab0d-6d32-4a12-a651-06af51c40a69'),
      'WtfDeNome',
      new Email('alissonfabricio04@gmail.com'),
      false,
      'Al!ss0n04',
    )

    gateway = {
      save: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      find: () => new Promise((resolve) => resolve(user)),
    } satisfies UserGateway

    notificationAdapter = {
      send: jest.fn().mockImplementationOnce(() => Promise.resolve()),
    } satisfies NotificationAdapter<string>

    signUpUseCase = new SignUpUseCase(gateway, notificationAdapter)
  })

  test('it should not be able sign up user if password and passwordAgain are different', async () => {
    const input = {
      data: {
        username: user.username,
        email: user.email.toString(),
        password: user.password!,
        passwordAgain: 'Al!ss0n04nnn',
      },
    }

    try {
      await signUpUseCase.handle(input)

      expect(true).toStrictEqual(false)
    } catch (error) {
      expect((error as Error).message).toStrictEqual('Senhas são diferentes')
    }
  })

  test('it should be able sign up', async () => {
    const input = {
      data: {
        username: user.username,
        email: user.email.toString(),
        password: user.password!,
        passwordAgain: user.password!,
      },
    }

    await expect(signUpUseCase.handle(input)).resolves.toStrictEqual({
      status: 'SUCCESS',
      data: {},
    })
  })
})
