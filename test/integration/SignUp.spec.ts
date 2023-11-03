import GetUser from '../../src/application/usecases/GetUser'
import SignUp from '../../src/application/usecases/SignUp'
import UserRepositoryInMemory from '../../src/infra/repositories/UserRepositoryInMemory'

let signUp: SignUp
let getUser: GetUser
let userRepositoryInMemory: UserRepositoryInMemory

beforeEach(() => {
  userRepositoryInMemory = new UserRepositoryInMemory()
  signUp = new SignUp(userRepositoryInMemory)
  getUser = new GetUser(userRepositoryInMemory)
})

test('it should not be able sign up if password is not equal', async () => {
  const input = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'senha diferente',
  }

  await expect(() => signUp.handle(input)).rejects.toThrow(
    'Senhas são diferentes',
  )
})

test('it should not be able sign up if username already in use', async () => {
  const input = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }

  await signUp.handle(input)

  await expect(() => signUp.handle(input)).rejects.toThrow('Username já em uso')
})

test('it should not be able sign up if password is not equal', async () => {
  const input = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'senha diferente',
  }

  await expect(() => signUp.handle(input)).rejects.toThrow(
    'Senhas são diferentes',
  )
})

test('it should be able sign up', async () => {
  const input = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }

  const outputSignUp = await signUp.handle(input)

  const outputGetUser = await getUser.handle(outputSignUp)
  expect(outputGetUser.userId).toBeDefined()
  expect(outputGetUser.username).toStrictEqual(input.username)
})
