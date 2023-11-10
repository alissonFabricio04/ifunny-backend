import PublishMeme from '../../../src/application/usecases/PublishMeme'
import MemeRepositoryInMemory from '../../../src/infra/repositories/MemeRepositoryInMemory'
import { generateRandomBase64 } from './GenerateRandomBase64'

export async function generateMemes(
  memesId: string[],
  userId: string,
  memeRepositoryInMemory: MemeRepositoryInMemory,
  qty: number,
) {
  const tagsAvaliabes = [
    [{ name: 'jujutsu kaisen' }, { name: 'anime' }],
    [{ name: 'programação' }, { name: 'python' }],
    [{ name: 'programação' }, { name: 'java' }, { name: 'pc' }],
    [{ name: 'bio shock' }, { name: 'jogos' }, { name: 'pc' }],
    [{ name: 'resident evil' }, { name: 'jogos' }],
    [{ name: 'naruto' }, { name: 'anime' }],
    [{ name: 'one piece' }, { name: 'anime' }],
    [{ name: 'naruto' }, { name: 'amv' }],
    [{ name: 'dragon ball' }, { name: 'anime' }],
    [{ name: 'attack on titan' }, { name: 'anime' }],
    [{ name: 'my hero academia' }, { name: 'anime' }],
    [{ name: 'anime' }, { name: 'amv' }],
  ]
  const publishMeme = new PublishMeme(memeRepositoryInMemory)
  for (let index = 0; index < qty; index++) {
    const inputPublishMeme = {
      authorId: userId,
      content: generateRandomBase64(),
      tags: tagsAvaliabes[index],
    }
    const outputPublishMeme = await publishMeme.handle(inputPublishMeme)
    memesId.push(outputPublishMeme.memeId)
  }
}
