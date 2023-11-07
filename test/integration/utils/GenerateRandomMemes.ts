import PublishMeme from '../../../src/application/usecases/PublishMeme'
import MemeRepositoryInMemory from '../../../src/infra/repositories/MemeRepositoryInMemory'
import { generateRandomBase64 } from './GenerateRandomBase64'
import { generateRandomTagsWithFrequency } from './GenerateRandomTagsWithFrequency'

export async function generateRandomMemes(
  memesId: string[],
  tagsAvaliabes: { name: string }[],
  tagsFrequency: number[],
  userId: string,
  memeRepositoryInMemory: MemeRepositoryInMemory,
  qty: number,
) {
  const publishMeme = new PublishMeme(memeRepositoryInMemory)
  for (let index = 0; index < qty; index++) {
    const inputPublishMeme = {
      authorId: userId,
      content: generateRandomBase64(),
      tags: generateRandomTagsWithFrequency(tagsAvaliabes, tagsFrequency),
    }
    const outputPublishMeme = await publishMeme.handle(inputPublishMeme)
    memesId.push(outputPublishMeme.memeId)
  }
}
