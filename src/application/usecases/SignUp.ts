/* eslint-disable no-useless-constructor */

import UserRepository from '../repositories/UserRepository'
import User from '../../domain/User'
import Name from '../../domain/Name'
import { isDeepStrictEqual } from 'node:util'

type Input = {
  username: string
  email: string
  password: string
  passwordAgain: string
}

export class SignUp {
  constructor(readonly userRepository: UserRepository) {}

  async handle(input: Input): Promise<void> {
    if (!isDeepStrictEqual(input.password, input.passwordAgain)) {
      throw new Error('Senhas são diferentes')
    }
    const user = User.create(input.username, input.password)
    const usernameAlreadyInUse = await this.userRepository.getByUsername(
      new Name(user.getUsername()),
    )
    if (usernameAlreadyInUse) throw new Error('Username já em uso')
    await this.userRepository.save(user)
  }
}
