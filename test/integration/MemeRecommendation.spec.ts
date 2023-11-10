import MemeRecommendation from '../../src/application/usecases/MemeRecommendation'
import SignUp from '../../src/application/usecases/SignUp'
import MemeRepositoryInMemory from '../../src/infra/repositories/MemeRepositoryInMemory'
import UserRepositoryInMemory from '../../src/infra/repositories/UserRepositoryInMemory'
import { generateLikesOnMemes } from './utils/GenerateLikesOnMemes'
import { generateMemes } from './utils/GenerateMemes'

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

  const memesId: string[] = []
  await generateMemes(memesId, outputSignUp.userId, memeRepositoryInMemory, 12)
  await generateLikesOnMemes(
    memesId,
    outputSignUp.userId,
    memeRepositoryInMemory,
    8,
  )

  const inputMemeRecommendation = {
    userId: outputSignUp.userId,
  }
  const outputMemeRecommendation = await memeRecommendation.handle(
    inputMemeRecommendation,
  )

  // console.log(JSON.stringify(await memeRepositoryInMemory.lastLikes(), null, 4))
  // console.log(JSON.stringify(outputMemeRecommendation.recommendations, null, 4))

  expect(outputMemeRecommendation).toBeDefined()
  expect(outputMemeRecommendation.recommendations).toHaveLength(7)
  expect(outputMemeRecommendation.recommendations[0].similarity).toStrictEqual(
    0.7071067811865475,
  )
  expect(outputMemeRecommendation.recommendations[0].tags).toStrictEqual([
    { name: 'programacao' },
    { name: 'python' },
  ])
  expect(outputMemeRecommendation.recommendations[1].similarity).toStrictEqual(
    0.8164965809277259,
  )
  expect(outputMemeRecommendation.recommendations[1].tags).toStrictEqual([
    { name: 'bio shock' },
    { name: 'jogos' },
    { name: 'pc' },
  ])
  expect(outputMemeRecommendation.recommendations[2].similarity).toStrictEqual(
    0.7071067811865475,
  )
  expect(outputMemeRecommendation.recommendations[2].tags).toStrictEqual([
    { name: 'naruto' },
    { name: 'anime' },
  ])
})
