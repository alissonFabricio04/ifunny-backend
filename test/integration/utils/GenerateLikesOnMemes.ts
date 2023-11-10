import LikeMeme from '../../../src/application/usecases/LikeMeme'
import MemeRepositoryInMemory from '../../../src/infra/repositories/MemeRepositoryInMemory'

export async function generateLikesOnMemes(
  memesId: string[],
  userId: string,
  memeRepositoryInMemory: MemeRepositoryInMemory,
  qty: number,
) {
  const likeMeme = new LikeMeme(memeRepositoryInMemory)
  for (let index = 0; index < qty; index++) {
    if (index % 2 === 0) {
      const memeId = memesId[index]
      const inputLikeMeme = {
        userId,
        memeId,
      }
      await likeMeme.handle(inputLikeMeme)
    }
  }
}
