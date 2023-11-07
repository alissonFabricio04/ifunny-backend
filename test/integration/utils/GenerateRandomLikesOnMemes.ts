import LikeMeme from '../../../src/application/usecases/LikeMeme'
import MemeRepositoryInMemory from '../../../src/infra/repositories/MemeRepositoryInMemory'
import { getRandomNumber } from './GetRandomNumber'

export async function generateRandomLikesOnMemes(
  memesId: string[],
  userId: string,
  memeRepositoryInMemory: MemeRepositoryInMemory,
  qty: number,
) {
  const likeMeme = new LikeMeme(memeRepositoryInMemory)
  for (let index = 0; index < getRandomNumber(qty); index++) {
    const memeId = memesId[getRandomNumber(memesId.length - 1)]
    const inputLikeMeme = {
      userId,
      memeId,
    }
    await likeMeme.handle(inputLikeMeme)
  }
}
