/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from '../../src/domain/Image'
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

test('it should not be able to create a user if username was not provided', () => {
  expect(() => User.create(undefined as any, '')).toThrow(
    'Nome não foi fornecido',
  )
})

test('it should not be able to create a user if username has special characters', () => {
  expect(() => User.create('@@@@@', '')).toThrow(
    'Nome não deve possuir caracteres especias',
  )
})

test('it should not be able to create a user if username is too long', () => {
  expect(() =>
    User.create(
      'Aa1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      '',
    ),
  ).toThrow('Nome muito longo')
})

test('it should not be able to create a user if username is too short', () => {
  expect(() => User.create('A', '')).toThrow('Nome muito curto')
})

test('it should not be able activate account if account already activated', () => {
  const u = User.create(user.username, user.password)

  expect(() => u.activeAccount()).toThrow('Conta já está ativa')
})

test('it should not be able change password if account not has activated', () => {
  const u = User.create(user.username, user.password)
  u.deactiveAccount()

  expect(() => u.changePassword('Al!ss0n045')).toThrow(
    'Para alterar a senha, sua conta deve estar ativa',
  )
})

test('it should not be able change password if password no has numbers', () => {
  expect(() => User.create(user.username, 'Al!ssonooo')).toThrow(
    'A senha deve possuir pelo menos um número',
  )
})

test('it should not be able change password if password no has special characters', () => {
  expect(() => User.create(user.username, 'Aliss0nooo')).toThrow(
    'A senha deve possuir pelo menos um caractere especial',
  )
})

test('it should not be able change password if password no has capital letter', () => {
  expect(() => User.create(user.username, 'aliss0nooo')).toThrow(
    'A senha deve possuir pelo menos uma letra maiúscula',
  )
})

test('it should not be able change password if password no has lowercase letter', () => {
  expect(() => User.create(user.username, 'ALISSONOO')).toThrow(
    'A senha deve possuir pelo menos uma letra minúscula',
  )
})

test('it should not be able change password if password is too short', () => {
  expect(() => User.create(user.username, 'A')).toThrow('Senha muito curta')
})

test('it should not be able change password if password is too long', () => {
  expect(() =>
    User.create(
      user.username,
      'Aa1!AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    ),
  ).toThrow('Senha muito longa')
})

test('it should not be able deactive user if user already deactive', () => {
  const c = User.create(user.username, user.password)
  c.deactiveAccount()

  expect(() => c.deactiveAccount()).toThrow('Conta já está inativa')
})

test('it should be able change password', () => {
  const u = User.create(user.username, user.password)

  u.changePassword('Al!ss0n045')

  const password = u.getPassword()
  expect(password.algorithm).toStrictEqual('pbkdf2')
  expect(password.value).toBeDefined()
})

test('it should be able activate user', () => {
  const u = User.create(user.username, user.password)

  u.deactiveAccount()
  u.activeAccount()

  expect(u.getIsActive()).toStrictEqual(true)
})

test('it should be able to create a user', () => {
  expect(User.create(user.username, user.password)).toBeInstanceOf(User)
})

test('it should be able get id', () => {
  const u = User.create(user.username, user.password)

  expect(u.userId.getValue()).toBeDefined()
})

test('it should be able get username', () => {
  const u = User.create(user.username, user.password)

  expect(u.getUsername()).toStrictEqual(user.username)
})

test('it should be able get profile picture', () => {
  const u = User.create(user.username, user.password)

  expect(u.getProfilePicture().getValue()).toStrictEqual(
    Image.createDefault().getValue(),
  )
})

test('it should be able restore user state', () => {
  const profilePicture = Image.createDefault().getValue()
  const userCreate = User.create(user.username, user.password, profilePicture)

  expect(
    User.restore(
      userCreate.userId.getValue(),
      userCreate.getUsername(),
      userCreate.getPassword().value,
      userCreate.getPassword().algorithm,
      userCreate.getPassword().salt,
      true,
      profilePicture,
    ),
  ).toBeInstanceOf(User)
})

test('it should be able restore user state', () => {
  const profilePicture = Image.createDefault().getValue()
  const userCreate = User.create(user.username, user.password, profilePicture)

  expect(
    User.restore(
      userCreate.userId.getValue(),
      userCreate.getUsername(),
      userCreate.getPassword().value,
      userCreate.getPassword().algorithm,
      userCreate.getPassword().salt,
      false,
      profilePicture,
    ),
  ).toBeInstanceOf(User)
})
