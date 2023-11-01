/* eslint-disable no-useless-constructor */

import Id from './Id'
import Name from './Name'
import Password, { PasswordFactory } from './Password'

export default class User {
  private constructor(
    readonly userId: Id,
    private username: Name,
    private password: Password,
    private isActive: boolean = true,
  ) {}

  activeAccount() {
    if (!this.getIsActive()) throw new Error('Conta já está inativa')
    this.isActive = true
  }

  deactiveAccount() {
    if (!this.getIsActive()) throw new Error('Conta já está inativa')
    this.isActive = false
  }

  changePassword(password: string) {
    if (!this.isActive) {
      throw new Error('Para alterar a senha, sua conta deve estar ativa')
    }
    this.password = PasswordFactory.create('pbkdf2').create(password)
  }

  static create(username: string, password: string) {
    return new User(
      Id.create(),
      new Name(username),
      PasswordFactory.create('pbkdf2').create(password),
    )
  }

  static restore(
    userId: string,
    username: string,
    password: string,
    passwordAlgorithm: string,
    salt: string,
    isActive: boolean,
  ) {
    return new User(
      new Id(userId),
      new Name(username),
      PasswordFactory.create(passwordAlgorithm).restore(password, salt),
      isActive,
    )
  }

  getUsername() {
    return this.username.getValue()
  }

  getIsActive() {
    return this.isActive
  }

  getPassword() {
    return this.password
  }
}
