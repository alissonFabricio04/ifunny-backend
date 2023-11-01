import { UserRepository } from '../repositories/user-repository'
import { User } from '../../domain/entities/user'
import { UseCaseError } from './error/usecase-error'
import { CryptoAdapter } from '../adapters/crypto-adapter'
import { isDeepStrictEqual } from 'node:util'

interface Input {
  username: string
  email: string
  password: string
  passwordAgain: string
}

export class SignUpUseCase {
  readonly userRepository: UserRepository
  readonly cryptoAdapter: CryptoAdapter

  constructor(userRepository: UserRepository, cryptoAdapter: CryptoAdapter) {
    this.userRepository = userRepository
    this.cryptoAdapter = cryptoAdapter
  }

  async handle(input: Input): Promise<void> {
    if (
      !input.password ||
      !input.passwordAgain ||
      !isDeepStrictEqual(input.password, input.passwordAgain)
    ) {
      throw new UseCaseError('Senhas são diferentes')
    }

    User.passwordIsValid(input.password)
    const passwordHash = await this.cryptoAdapter.hash(input.password)

    const user = User.create(input.username, passwordHash)

    const usernameAlreadyInUse = await this.userRepository.getByUsername(
      user.getUsername(),
    )

    if (usernameAlreadyInUse) {
      throw new UseCaseError('Username já em uso')
    }

    await this.userRepository.save(user)
  }
}
