import SignIn from '../../src/application/usecases/SignIn'
import SignUp from '../../src/application/usecases/SignUp'
import TokenAdapterJWT from '../../src/infra/adapters/TokenAdapterJWT'
import UserRepositoryInMemory from '../../src/infra/repositories/UserRepositoryInMemory'

let signUp: SignUp
let signIn: SignIn
let userRepositoryInMemory: UserRepositoryInMemory
let tokenAdapterJWT: TokenAdapterJWT

beforeEach(() => {
  userRepositoryInMemory = new UserRepositoryInMemory()
  tokenAdapterJWT = new TokenAdapterJWT()
  signUp = new SignUp(userRepositoryInMemory)
  signIn = new SignIn(userRepositoryInMemory, tokenAdapterJWT)
})

test('it should not be able sign in if user not exists', async () => {
  const input = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'senha diferente',
  }

  await expect(() => signIn.handle(input)).rejects.toThrow(
    'Username ou senha inválidos',
  )
})

test('it should not be able sign in if password is not equal', async () => {
  const inputSignUp = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }

  await signUp.handle(inputSignUp)

  const inputSignIn = {
    username: 'wftDeNome',
    password: 'S3nh@MtS3gur@aaaa',
  }
  await expect(() => signIn.handle(inputSignIn)).rejects.toThrow(
    'Senha ou username incorreto',
  )
})

test('it should be able sign in', async () => {
  const inputSignUp = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }

  await signUp.handle(inputSignUp)

  const inputSignIn = {
    username: 'wftDeNome',
    password: 'S3nh@MtS3gur@',
  }
  const outputSignIn = await signIn.handle(inputSignIn)
  expect(outputSignIn.token).toBeDefined()
})
