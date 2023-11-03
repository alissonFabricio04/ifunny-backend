/* eslint-disable no-useless-escape */

import crypto from 'node:crypto'

function isSafe(password: string): boolean {
  if (!password) throw new Error('Senha inválida')
  if (password.length < 8) throw new Error('Senha muito curta')
  if (password.length > 100) throw new Error('Senha muito longa')

  const regexUpperCase = /[A-Z]/
  if (!regexUpperCase.test(password)) {
    throw new Error('A senha deve possuir pelo menos uma letra maiúscula')
  }

  const regexLowerCase = /[a-z]/
  if (!regexLowerCase.test(password)) {
    throw new Error('A senha deve possuir pelo menos uma letra minúscula')
  }

  const regexNumber = /[0-9]/
  if (!regexNumber.test(password)) {
    throw new Error('A senha deve possuir pelo menos um número')
  }

  const regexSpecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/
  if (!regexSpecial.test(password)) {
    throw new Error('A senha deve possuir pelo menos um caractere especial')
  }

  return true
}

export default interface Password {
  value: string
  salt: string
  algorithm: string
  validate(password: string): boolean
}

export class PlainPassword implements Password {
  algorithm: string

  private constructor(
    readonly value: string,
    readonly salt: string,
  ) {
    this.algorithm = 'plain'
  }

  static create(password: string) {
    isSafe(password)
    return new PlainPassword(password, '')
  }

  static restore(password: string, salt: string) {
    return new PlainPassword(password, salt)
  }

  validate(password: string): boolean {
    return this.value === password
  }
}

export class SHA1Password implements Password {
  algorithm: string

  private constructor(
    readonly value: string,
    readonly salt: string,
  ) {
    this.algorithm = 'sha1'
  }

  static create(password: string) {
    isSafe(password)
    const value = crypto.createHash('sha1').update(password).digest('hex')
    return new SHA1Password(value, '')
  }

  static restore(password: string, salt: string) {
    return new SHA1Password(password, salt)
  }

  validate(password: string): boolean {
    const value = crypto.createHash('sha1').update(password).digest('hex')
    return this.value === value
  }
}

export class PBKDF2Password implements Password {
  algorithm: string

  private constructor(
    readonly value: string,
    readonly salt: string,
  ) {
    this.algorithm = 'pbkdf2'
  }

  static create(password: string) {
    isSafe(password)
    const salt = crypto.randomBytes(20).toString('hex')
    const value = crypto
      .pbkdf2Sync(password, salt, 100, 64, 'sha512')
      .toString('hex')
    return new PBKDF2Password(value, salt)
  }

  static restore(password: string, salt: string) {
    return new PBKDF2Password(password, salt)
  }

  validate(password: string): boolean {
    const value = crypto
      .pbkdf2Sync(password, this.salt, 100, 64, 'sha512')
      .toString('hex')
    return this.value === value
  }
}

export class PasswordFactory {
  static create(algorithm: string) {
    if (algorithm === 'plain') return PlainPassword
    if (algorithm === 'sha1') return SHA1Password
    if (algorithm === 'pbkdf2') return PBKDF2Password
    throw new Error('Criptografia não conhecida')
  }
}
