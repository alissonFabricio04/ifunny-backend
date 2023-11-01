import { CryptoAdapter } from '../adapters/crypto-adapter'
import { UserRepository } from '../repositories/user-repository'
import { UseCaseError } from './error/usecase-error'
import { TokenAdapter } from '../adapters/token-adapter'

interface Input {
  username: string
  password: string
}

interface Output {
  token: string
}

export class SignInUseCase {
  readonly userRepository: UserRepository
  readonly cryptoAdapter: CryptoAdapter
  readonly tokenAdapter: TokenAdapter

  constructor(
    userRepository: UserRepository,
    cryptoAdapter: CryptoAdapter,
    tokenAdapter: TokenAdapter,
  ) {
    this.userRepository = userRepository
    this.cryptoAdapter = cryptoAdapter
    this.tokenAdapter = tokenAdapter
  }

  async handle(input: Input): Promise<Output> {
    if (!input.username || !input.password) {
      throw new UseCaseError('Username ou senha inválidos')
    }

    const userExists = await this.userRepository.getByUsername(input.username)

    if (!userExists) {
      throw new UseCaseError('Username ou senha inválidos')
    }

    const passwordsIsEqual = this.cryptoAdapter.compare(
      input.password,
      String(userExists.getPassword()),
    )

    if (!passwordsIsEqual) {
      throw new UseCaseError('Senhas ou username incorreto')
    }

    const userId = userExists.getId()

    const token = this.tokenAdapter.sign(userId.getId())

    return {
      token,
    }
  }
}
