import MemeRecommendation from '../../src/application/usecases/MemeRecommendation'
import SignUp from '../../src/application/usecases/SignUp'
import MemeRepositoryInMemory from '../../src/infra/repositories/MemeRepositoryInMemory'
import UserRepositoryInMemory from '../../src/infra/repositories/UserRepositoryInMemory'
import { generateRandomLikesOnMemes } from './utils/GenerateRandomLikesOnMemes'
import { generateRandomMemes } from './utils/GenerateRandomMemes'

let signUp: SignUp
let memeRecommendation: MemeRecommendation
let userRepositoryInMemory: UserRepositoryInMemory
let memeRepositoryInMemory: MemeRepositoryInMemory

beforeEach(() => {
  userRepositoryInMemory = new UserRepositoryInMemory()
  memeRepositoryInMemory = new MemeRepositoryInMemory()
  signUp = new SignUp(userRepositoryInMemory)
  memeRecommendation = new MemeRecommendation(memeRepositoryInMemory)
})

test('it should be able receive recommendations of memes', async () => {
  const inputSignUp = {
    username: 'wftDeNome',
    email: 'wftdenome@email.com',
    password: 'S3nh@MtS3gur@',
    passwordAgain: 'S3nh@MtS3gur@',
  }
  const outputSignUp = await signUp.handle(inputSignUp)

  const tagsAvaliabes = [
    { name: 'jujutsu kaisen' },
    { name: 'programação' },
    { name: 'bio shock' },
    { name: 'resident evil' },
    { name: 'one piece' },
    { name: 'naruto' },
    { name: 'dragon ball' },
    { name: 'attack on titan' },
    { name: 'my hero academia' },
    { name: 'anime' },
    { name: 'videogame' },
    { name: 'playstation' },
    { name: 'xbox' },
    { name: 'nintendo' },
    { name: 'pc gaming' },
    { name: 'game development' },
    { name: 'music' },
    { name: 'rock' },
    { name: 'pop' },
    { name: 'hip-hop' },
    { name: 'classical' },
    { name: 'jazz' },
    { name: 'programming' },
    { name: 'coding' },
    { name: 'web development' },
    { name: 'machine learning' },
    { name: 'artificial intelligence' },
    { name: 'data science' },
    { name: 'space' },
    { name: 'nature' },
    { name: 'history' },
    { name: 'cooking' },
  ]
  const memesId: string[] = []
  await generateRandomMemes(
    memesId,
    tagsAvaliabes,
    [3, 3, 3, 3, 3, 3],
    outputSignUp.userId,
    memeRepositoryInMemory,
    100,
  )
  await generateRandomLikesOnMemes(
    memesId,
    outputSignUp.userId,
    memeRepositoryInMemory,
    5,
  )

  const inputMemeRecommendation = {
    userId: outputSignUp.userId,
  }
  const outputMemeRecommendation = await memeRecommendation.handle(
    inputMemeRecommendation,
  )

  expect(outputMemeRecommendation).toBeDefined()
  console.log(JSON.stringify(await memeRepositoryInMemory.lastLikes(), null, 4))
  console.log(JSON.stringify(outputMemeRecommendation.recommendations, null, 4))
})
