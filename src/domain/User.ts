/* eslint-disable no-useless-constructor */

import Id from './Id'
import Image from './Image'
import Name from './Name'
import Password, { PasswordFactory } from './Password'

export default class User {
  private constructor(
    readonly userId: Id,
    private username: Name,
    private password: Password,
    private profilePicture: Image,
    private isActive = true,
  ) {}

  activeAccount() {
    if (this.getIsActive()) throw new Error('Conta já está ativa')
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

  static create(username: string, password: string, profilePicture?: string) {
    if (!profilePicture) {
      return new User(
        Id.create(),
        new Name(username),
        PasswordFactory.create('pbkdf2').create(password),
        Image.createDefault(),
        true,
      )
    }
    return new User(
      Id.create(),
      new Name(username),
      PasswordFactory.create('pbkdf2').create(password),
      new Image(profilePicture),
      true,
    )
  }

  static restore(
    userId: string,
    username: string,
    password: string,
    passwordAlgorithm: string,
    salt: string,
    isActive: boolean,
    profilePicture: string,
  ) {
    return new User(
      new Id(userId),
      new Name(username),
      PasswordFactory.create(passwordAlgorithm).restore(password, salt),
      new Image(profilePicture),
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

  getProfilePicture() {
    return this.profilePicture
  }
}
