/* eslint-disable no-useless-escape */

import { Id } from '../value-objects/id'
import { DomainError } from '../error/domain-error'

export class User {
  private id: Id
  private username: string
  private isActive?: boolean
  private password?: string

  constructor(id: Id, username: string, isActive: boolean, password?: string) {
    this.setId(id)
    this.setUsername(username)
    this.setIsActive(isActive)

    if (password) {
      this.setPassword(password)
    }
  }

  static create(username: string, password: string) {
    return new User(Id.create(), username, true, password)
  }

  activeAccount() {
    if (this.getIsActive()) {
      throw new DomainError('Conta já está ativa')
    }

    this.isActive = true
  }

  deactiveAccount() {
    if (!this.getIsActive()) {
      throw new DomainError('Conta já está inativa')
    }

    this.isActive = false
  }

  static passwordIsValid(password: string) {
    const regexUpperCase = /[A-Z]/
    const regexLowerCase = /[a-z]/
    const regexNumber = /[0-9]/
    const regexSpecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/

    if (password.length < 8) {
      throw new DomainError('Senha muito curta')
    }

    if (password.length > 100) {
      throw new DomainError('Senha muito longa')
    }

    if (!regexUpperCase.test(password)) {
      throw new DomainError(
        'A senha deve possuir pelo menos uma letra maiúscula',
      )
    }

    if (!regexLowerCase.test(password)) {
      throw new DomainError(
        'A senha deve possuir pelo menos uma letra minúscula',
      )
    }

    if (!regexNumber.test(password)) {
      throw new DomainError('A senha deve possuir pelo menos um número')
    }

    if (!regexSpecial.test(password)) {
      throw new DomainError(
        'A senha deve possuir pelo menos um caractere especial',
      )
    }

    return true
  }

  changePassword(password: string) {
    if (!this.isActive) {
      throw new DomainError('Para alterar a senha, sua conta deve estar ativa')
    }

    this.password = password
  }

  getId() {
    return this.id
  }

  private setId(id: Id) {
    if (!(id satisfies Id) || !id || !('getId' in id)) {
      throw new DomainError('Id não foi fornecido')
    }

    this.id = id
  }

  getUsername(): string {
    return this.username
  }

  private setUsername(username: string) {
    if (!username) {
      throw new DomainError('Username não foi fornecido')
    }

    if (username.length <= 1) {
      throw new DomainError('Username muito curto')
    }

    if (username.length > 40) {
      throw new DomainError('Username muito longo')
    }

    const specialCharsPattern = /[!@#$%^&*()#+{}\[\]:;''<>,.?~`|\\\/\-]/

    if (specialCharsPattern.test(username)) {
      throw new DomainError(
        'Nome de pasta não deve possuir caracteres especias',
      )
    }

    this.username = username
  }

  getIsActive() {
    return this.isActive
  }

  private setIsActive(isActive: boolean) {
    if (typeof isActive !== 'boolean') {
      throw new DomainError('Status invalido')
    }

    this.isActive = isActive
  }

  getPassword(): string | undefined {
    return this.password
  }

  private setPassword(password: string) {
    if (User.passwordIsValid(password)) {
      this.password = password
    }
  }
}
