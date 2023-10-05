import { describe, beforeEach, jest, expect, test } from 'bun:test'

import { NotificationAdapter } from '../../../src/adapters/notification-adapter'
import { Email } from '../../../src/entities/email/model/email-value-object'
import { Id } from '../../../src/entities/id/model/id-value-object'
import { UserGateway } from '../../../src/entities/user/gateways/user-gateway'
import { User } from '../../../src/entities/user/model/user'
import { SignUpUseCase } from '../../../src/usecases/user/signUp-use-case'
import { Meme } from '../../../src/entities/meme/model/meme'

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

    const meme = new Meme(
      new Id('7996dc77-4da0-4cab-b172-1296ed891800'),
      new Id('8de4254c-f75f-4a77-a885-7b41de1b0cea'),
      { uri: 's3://meu-bucket/arquivo-de-teste02.mp3' },
      [
        { name: 'nazismo', weight: 1 },
        { name: 'é', weight: 1 },
        { name: 'um', weight: 1 },
        { name: 'lixo', weight: 1 },
      ],
    )

    gateway = {
      save: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      find: () => new Promise((resolve) => resolve(user)),
      alreadyFolderWithThisName: () => new Promise((resolve) => resolve(true)),
      createFolder: jest.fn().mockImplementationOnce(() => Promise.resolve()),
      folderExists: jest.fn().mockImplementationOnce(() => Promise.resolve(true)),
      getFolders: jest.fn().mockImplementationOnce(() => Promise.resolve([])),
      getMemeInFolder: jest.fn().mockImplementationOnce(() => Promise.resolve([meme])),
      repubMeme: jest.fn().mockImplementationOnce(() => Promise.resolve()),
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
    gateway.find = () => new Promise((resolve) => resolve(null))
    
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
