import { beforeEach, describe, expect, test } from 'bun:test'

import { User } from '../../../src/entities/user/model/user'
import { Email } from '../../../src/entities/email/email-value-object'

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
      password: '12345'
    }
  })

  test('it should not be able create user if id is invalid', () => {
    expect(
      () =>
        new User(
          '',
          user.username,
          user.email,
          user.isActive,
        ),
    ).toThrow('Id invalido')
  })

  test('it should not be able create user if username is invalid', () => {
    expect(
      () =>
        new User(
          user.id,
          '',
          user.email,
          user.isActive,
        ),
    ).toThrow('Username invalido')
  })

  test('it should not be able create user if e-mail not satisfies', () => {
    expect(
      () =>
        new User(
          user.id,
          user.username,
          {} as Email,
          user.isActive,
        ),
    ).toThrow('E-mail invalido')
  })

  test('it should not be able activate account if account already activated', () => {
    const u = new User(
      user.id,
      user.username,
      user.email,
      user.isActive,
    )

    u.activeAccount()

    expect(() => u.activeAccount()).toThrow('Conta já está ativa')
  })

  test('it should not be able change e-email if account not has activated', () => {
    const u = new User(
      user.id,
      user.username,
      user.email,
      user.isActive,
    )

    expect(() => u.changeEmail(new Email('aaaa@gmail.com'))).toThrow(
      'Valide sua conta primeiro',
    )
  })

  test('it should be able change e-email', () => {
    const u = new User(
      user.id,
      user.username,
      user.email,
      user.isActive,
    )

    u.activeAccount()
    u.changeEmail(new Email('aaaa@gmail.com'))

    expect(u.email.toString()).toEqual('aaaa@gmail.com')
  })

  test('it should not be able change password if account not has activated', () => {
    const u = new User(
      user.id,
      user.username,
      user.email,
      user.isActive,
      user.password
    )

    expect(() => u.changePassword('12345')).toThrow(
      'Valide sua conta primeiro',
    )
  })

  test('it should be able change password', () => {
    const u = new User(
      user.id,
      user.username,
      user.email,
      user.isActive,
    )

    u.activeAccount()
    u.changePassword('12345')

    expect(u.password).toEqual('12345')
  })

  test('it should be able create user', () => {
    expect(
      new User(
        user.id,
        user.username,
        user.email,
        user.isActive,
        user.password
      ),
    ).toBeInstanceOf(User)
  })

  test('it should be able get id', () => {
    const u = new User(
      user.id,
      user.username,
      user.email,
      user.isActive,
      user.password
    )

    expect(u.id).toEqual(user.id)
  })

  test('it should be able get username', () => {
    const u = new User(
      user.id,
      user.username,
      user.email,
      user.isActive,
      user.password
    )

    expect(u.username).toEqual(user.username)
  })

  test('it should be able get e-mail', () => {
    const u = new User(
      user.id,
      user.username,
      user.email,
      user.isActive,
      user.password
    )

    expect(u.email.toString()).toEqual(user.email.toString())
  })
})
