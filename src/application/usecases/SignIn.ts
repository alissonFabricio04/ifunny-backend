/* eslint-disable no-useless-constructor */

import Name from '../../domain/Name'
import { TokenAdapter } from '../adapters/TokenAdapter'
import UserRepository from '../repositories/UserRepository'

type Input = {
  username: string
  password: string
}

type Output = {
  token: string
}

export class SignIn {
  constructor(
    readonly userRepository: UserRepository,
    readonly tokenAdapter: TokenAdapter,
  ) {}

  async handle(input: Input): Promise<Output> {
    const userExists = await this.userRepository.getByUsername(
      new Name(input.username),
    )
    if (!userExists) throw new Error('Username ou senha inválidos')
    const passwordsIsEqual = userExists.getPassword().validate(input.password)
    if (!passwordsIsEqual) throw new Error('Senhas ou username incorreto')
    const userId = userExists.userId
    const token = this.tokenAdapter.sign(userId.getValue())
    return {
      token,
    }
  }
}
