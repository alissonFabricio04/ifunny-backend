import {
  PBKDF2Password,
  PasswordFactory,
  PlainPassword,
  SHA1Password,
} from '../../src/domain/Password'

test('it should be able create password if password not informed', () => {
  expect(() => PlainPassword.create('')).toThrow('Senha inválida')
})

test('it should be able create password if password is too short', () => {
  expect(() => PlainPassword.create('a')).toThrow('Senha muito curta')
})

test('it should be able create password if password is too long', () => {
  let password = ''
  for (let index = 0; index < 102; index++) {
    password += 'a'
  }

  expect(() => PlainPassword.create(password)).toThrow('Senha muito longa')
})

test('it should be able create password if password does not contain uppercase characters', () => {
  expect(() => PlainPassword.create('aaaaaaaaaaaa')).toThrow(
    'A senha deve possuir pelo menos uma letra maiúscula',
  )
})

test('it should be able create password if password does not contain lowercase characters', () => {
  expect(() => PlainPassword.create('AAAAAAAAAAAAAAAAAAAAAA')).toThrow(
    'A senha deve possuir pelo menos uma letra minúscula',
  )
})

test('it should be able create password if password does not contain numbers', () => {
  expect(() => PlainPassword.create('aaaaAAAAAAAAA')).toThrow(
    'A senha deve possuir pelo menos um número',
  )
})

test('it should be able create password if password does not special characters', () => {
  expect(() => PlainPassword.create('aaaaAAAAAAAAA1111111')).toThrow(
    'A senha deve possuir pelo menos um caractere especial',
  )
})

test('it should be able create new plain password instance', () => {
  expect(PlainPassword.create('aaaaS3nh@')).toBeInstanceOf(PlainPassword)
})

test('it should be able restore plain password state', () => {
  const password = 'aaaaS3nh@'
  const p = PlainPassword.create(password)
  expect(PlainPassword.restore(password, p.salt)).toBeInstanceOf(PlainPassword)
})

test('it should be able validate plain password', () => {
  const password = 'aaaaS3nh@'
  const p = PlainPassword.create(password)
  expect(p.validate(password)).toStrictEqual(true)
})

test('it should be able create new sha1 password instance', () => {
  expect(SHA1Password.create('aaaaS3nh@')).toBeInstanceOf(SHA1Password)
})

test('it should be able restore sha1 password state', () => {
  const password = 'aaaaS3nh@'
  const p = SHA1Password.create(password)
  expect(SHA1Password.restore(password, p.salt)).toBeInstanceOf(SHA1Password)
})

test('it should be able validate sha1 password', () => {
  const password = 'aaaaS3nh@'
  const p = SHA1Password.create(password)
  expect(p.validate(password)).toStrictEqual(true)
})

test('it should be able create new pbkdf2 password instance', () => {
  expect(PBKDF2Password.create('aaaaS3nh@')).toBeInstanceOf(PBKDF2Password)
})

test('it should be able restore pbkdf2 password state', () => {
  const password = 'aaaaS3nh@'
  const p = PBKDF2Password.create(password)
  expect(PBKDF2Password.restore(password, p.salt)).toBeInstanceOf(
    PBKDF2Password,
  )
})

test('it should be able validate pbkdf2 password', () => {
  const password = 'aaaaS3nh@'
  const p = PBKDF2Password.create(password)
  expect(p.validate(password)).toStrictEqual(true)
})

test('it should be able create new plain password from factory', () => {
  const password = 'aaaaS3nh@'
  expect(PasswordFactory.create('plain').create(password)).toBeInstanceOf(
    PlainPassword,
  )
})

test('it should be able create new sha1 password from factory', () => {
  const password = 'aaaaS3nh@'
  expect(PasswordFactory.create('sha1').create(password)).toBeInstanceOf(
    SHA1Password,
  )
})

test('it should be able create new pbkdf2 password from factory', () => {
  const password = 'aaaaS3nh@'
  expect(PasswordFactory.create('pbkdf2').create(password)).toBeInstanceOf(
    PBKDF2Password,
  )
})

test('it should not be able create new password if method not exists in factory', () => {
  const password = 'aaaaS3nh@'
  expect(() => PasswordFactory.create('aaaaaa').create(password)).toThrow(
    'Criptografia não conhecida',
  )
})
