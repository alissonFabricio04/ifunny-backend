/* eslint-disable @typescript-eslint/no-explicit-any */

import Id from '../../src/domain/Id'
import User from '../../src/domain/User'

let user: {
  id: string
  username: string
  isActive: boolean
  password: string
}

beforeEach(() => {
  user = {
    id: 'd262ab0d-6d32-4a12-a651-06af51c40a69',
    username: 'Alisson',
    isActive: false,
    password: 'Al!ss0n04',
  }
})

test('it should not be able to create a user if id is invalid', () => {
  expect(() => new User({} as Id, user.username, user.isActive)).toThrow(
    'Id não foi fornecido',
  )
})

test('it should not be able to create a user if username was not provided', () => {
  expect(() => new User(new Id(user.id), '', user.isActive)).toThrow(
    'Username não foi fornecido',
  )
})

test('it should not be able to create a user if username has special characters', () => {
  expect(() => new User(new Id(user.id), '@@@@@', user.isActive)).toThrow(
    'Nome de pasta não deve possuir caracteres especias',
  )
})

test('it should not be able to create a user if username is too long', () => {
  expect(
    () =>
      new User(
        new Id(user.id),
        'Aa1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        user.isActive,
      ),
  ).toThrow('Username muito longo')
})

test('it should not be able to create a user if username is too short', () => {
  expect(() => new User(new Id(user.id), 'A', user.isActive)).toThrow(
    'Username muito curto',
  )
})

test('it should not be able activate account if account already activated', () => {
  const u = new User(new Id(user.id), user.username, user.isActive)

  u.activeAccount()

  expect(() => u.activeAccount()).toThrow('Conta já está ativa')
})

test('it should not be able change password if account not has activated', () => {
  const u = new User(
    new Id(user.id),
    user.username,
    user.isActive,
    user.password,
  )

  expect(() => u.changePassword('Al!ss0n045')).toThrow(
    'Para alterar a senha, sua conta deve estar ativa',
  )
})

test('it should not be able change password if password no has numbers', () => {
  expect(
    () => new User(new Id(user.id), user.username, user.isActive, 'Al!ssonooo'),
  ).toThrow('A senha deve possuir pelo menos um número')
})

test('it should not be able change password if password no has special characters', () => {
  expect(
    () => new User(new Id(user.id), user.username, user.isActive, 'Aliss0nooo'),
  ).toThrow('A senha deve possuir pelo menos um caractere especial')
})

test('it should not be able change password if password no has capital letter', () => {
  expect(
    () => new User(new Id(user.id), user.username, user.isActive, 'aliss0nooo'),
  ).toThrow('A senha deve possuir pelo menos uma letra maiúscula')
})

test('it should not be able change password if password no has lowercase letter', () => {
  expect(
    () => new User(new Id(user.id), user.username, user.isActive, 'ALISSONOO'),
  ).toThrow('A senha deve possuir pelo menos uma letra minúscula')
})

test('it should not be able change password if password is too short', () => {
  expect(
    () => new User(new Id(user.id), user.username, user.isActive, 'A'),
  ).toThrow('Senha muito curta')
})

test('it should not be able change password if password is too long', () => {
  expect(
    () =>
      new User(
        new Id(user.id),
        user.username,
        user.isActive,
        'Aa1!AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      ),
  ).toThrow('Senha muito longa')
})

test('it should not be able activate user if user already activate', () => {
  const c = new User(new Id(user.id), user.username, true, user.password)

  expect(() => c.activeAccount()).toThrow('Conta já está ativa')
})

test('it should not be able deactive user if user already deactive', () => {
  const c = new User(new Id(user.id), user.username, false, user.password)

  expect(() => c.deactiveAccount()).toThrow('Conta já está inativa')
})

test('it should not be able deactive user if user already deactive', () => {
  expect(
    () =>
      new User(new Id(user.id), user.username, undefined as any, user.password),
  ).toThrow('Status invalido')
})

test('it should be able change password', () => {
  const u = new User(new Id(user.id), user.username, user.isActive)

  u.activeAccount()
  u.changePassword('Al!ss0n045')

  expect(u.getPassword()).toStrictEqual('Al!ss0n045')
})

test('it should be able activate user', () => {
  const u = new User(new Id(user.id), user.username, false)

  u.activeAccount()

  expect(u.getIsActive()).toStrictEqual(true)
})

test('it should be able deactive user', () => {
  const u = new User(new Id(user.id), user.username, true)

  u.deactiveAccount()

  expect(u.getIsActive()).toStrictEqual(false)
})

test('it should be able to instance a user', () => {
  expect(
    new User(new Id(user.id), user.username, user.isActive, user.password),
  ).toBeInstanceOf(User)
})

test('it should be able to create a user', () => {
  expect(User.create(user.username, user.password)).toBeInstanceOf(User)
})

test('it should be able get id', () => {
  const u = new User(
    new Id(user.id),
    user.username,

    user.isActive,
    user.password,
  )

  expect(u.getId()).toStrictEqual(new Id(user.id))
})

test('it should be able get username', () => {
  const u = new User(
    new Id(user.id),
    user.username,

    user.isActive,
    user.password,
  )

  expect(u.getUsername()).toStrictEqual(user.username)
})
