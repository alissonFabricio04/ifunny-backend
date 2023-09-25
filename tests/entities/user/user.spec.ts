import { beforeEach, describe, expect, test } from 'bun:test'

import { User } from '../../../src/entities/user/model/user'
import { Email } from '../../../src/entities/email/model/email-value-object'
import { Id } from '../../../src/entities/id/model/id-value-object'

describe('Suite test for testing user entity', () => {
  let user: {
    id: string
    username: string
    email: Email
    isActive: boolean
    password: string
  }

  beforeEach(() => {
    user = {
      id: 'd262ab0d-6d32-4a12-a651-06af51c40a69',
      username: 'Alisson',
      email: new Email('alissonfabricio.dev@gmail.com'),
      isActive: false,
      password: 'Al!ss0n04',
    }
  })

  test('it should not be able to create a user if id is invalid', () => {
    expect(
      () => new User({} as Id, user.username, user.email, user.isActive),
    ).toThrow('Id não foi fornecido')
  })

  test('it should not be able to create a user if username was not provided', () => {
    expect(
      () => new User(new Id(user.id), '', user.email, user.isActive),
    ).toThrow('Username não foi fornecido')
  })

  test('it should not be able to create a user if username has special characters', () => {
    expect(
      () => new User(new Id(user.id), '@@@@@', user.email, user.isActive),
    ).toThrow('Username não deve possuir caracteres especias')
  })

  test('it should not be able to create a user if username is too long', () => {
    expect(
      () =>
        new User(
          new Id(user.id),
          'Aa1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          user.email,
          user.isActive,
        ),
    ).toThrow('Username muito longo')
  })

  test('it should not be able to create a user if username is too short', () => {
    expect(
      () => new User(new Id(user.id), 'A', user.email, user.isActive),
    ).toThrow('Username muito curto')
  })

  test('it should not be able to create a user if e-mail not satisfies', () => {
    expect(
      () =>
        new User(new Id(user.id), user.username, {} as Email, user.isActive),
    ).toThrow('E-mail não foi fornecido')
  })

  test('it should not be able activate account if account already activated', () => {
    const u = new User(
      new Id(user.id),
      user.username,
      user.email,
      user.isActive,
    )

    u.activeAccount()

    expect(() => u.activeAccount()).toThrow('Conta já está ativa')
  })

  test('it should not be able change e-email if account not has activated', () => {
    const u = new User(
      new Id(user.id),
      user.username,
      user.email,
      user.isActive,
    )

    expect(() => u.changeEmail(new Email('aaaa@gmail.com'))).toThrow(
      'Para alterar o e-mail, sua conta deve estar validada',
    )
  })

  test('it should be able change e-email', () => {
    const u = new User(
      new Id(user.id),
      user.username,
      user.email,
      user.isActive,
    )

    u.activeAccount()
    u.changeEmail(new Email('aaaa@gmail.com'))

    expect(u.email.toString()).toStrictEqual('aaaa@gmail.com')
  })

  test('it should not be able change password if account not has activated', () => {
    const u = new User(
      new Id(user.id),
      user.username,
      user.email,
      user.isActive,
      user.password,
    )

    expect(() => u.changePassword('Al!ss0n045')).toThrow(
      'Para alterar a senha, sua conta deve estar validada',
    )
  })

  test('it should not be able change password if password no has numbers', () => {
    expect(
      () =>
        new User(
          new Id(user.id),
          user.username,
          user.email,
          user.isActive,
          'Al!ssonooo',
        ),
    ).toThrow('A senha deve possuir pelo menos um número')
  })

  test('it should not be able change password if password no has special characters', () => {
    expect(
      () =>
        new User(
          new Id(user.id),
          user.username,
          user.email,
          user.isActive,
          'Aliss0nooo',
        ),
    ).toThrow('A senha deve possuir pelo menos um caractere especial')
  })

  test('it should not be able change password if password no has capital letter', () => {
    expect(
      () =>
        new User(
          new Id(user.id),
          user.username,
          user.email,
          user.isActive,
          'aliss0nooo',
        ),
    ).toThrow('A senha deve possuir pelo menos uma letra maiúscula')
  })

  test('it should not be able change password if password no has lowercase letter', () => {
    expect(
      () =>
        new User(
          new Id(user.id),
          user.username,
          user.email,
          user.isActive,
          'ALISSONOO',
        ),
    ).toThrow('A senha deve possuir pelo menos uma letra minúscula')
  })

  test('it should not be able change password if password is too short', () => {
    expect(
      () =>
        new User(
          new Id(user.id),
          user.username,
          user.email,
          user.isActive,
          'A',
        ),
    ).toThrow('Senha muito curta')
  })

  test('it should not be able change password if password is too long', () => {
    expect(
      () =>
        new User(
          new Id(user.id),
          user.username,
          user.email,
          user.isActive,
          'Aa1!AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        ),
    ).toThrow('Senha muito longa')
  })

  test('it should be able change password', () => {
    const u = new User(
      new Id(user.id),
      user.username,
      user.email,
      user.isActive,
    )

    u.activeAccount()
    u.changePassword('Al!ss0n045')

    expect(u.password).toStrictEqual('Al!ss0n045')
  })

  test('it should be able to create a user', () => {
    expect(
      new User(
        new Id(user.id),
        user.username,
        user.email,
        user.isActive,
        user.password,
      ),
    ).toBeInstanceOf(User)
  })

  test('it should be able get id', () => {
    const u = new User(
      new Id(user.id),
      user.username,
      user.email,
      user.isActive,
      user.password,
    )

    expect(u.id).toStrictEqual(new Id(user.id))
  })

  test('it should be able get username', () => {
    const u = new User(
      new Id(user.id),
      user.username,
      user.email,
      user.isActive,
      user.password,
    )

    expect(u.username).toStrictEqual(user.username)
  })

  test('it should be able get e-mail', () => {
    const u = new User(
      new Id(user.id),
      user.username,
      user.email,
      user.isActive,
      user.password,
    )

    expect(u.email.toString()).toStrictEqual(user.email.toString())
  })
})
