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

test('it should not be able get user if user not exists', async () => {
  const input = {
    userId: '49867090-a65f-42bf-8986-7b5edad3028c',
  }

  await expect(() => getUser.handle(input)).rejects.toThrow(
    'Usuario não encontrado',
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
