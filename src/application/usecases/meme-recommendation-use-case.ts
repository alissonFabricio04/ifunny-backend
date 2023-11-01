import { Id } from '../../domain/value-objects/id'
import { Meme, Tag } from '../../domain/entities/meme'
import { MemeRepository } from '../repositories/meme-repository'

interface Input {
  userId: string
}

interface Output {
  recommendations: Meme[]
}

export class MemeRecommendationUseCase {
  readonly memeRepository: MemeRepository

  constructor(memeRepository: MemeRepository) {
    this.memeRepository = memeRepository
  }

  async handle(input: Input): Promise<Output> {
    const userId = new Id(input.userId)
    const last200Likes = await this.memeRepository.lastLikes(userId, 200)
    const recentMemesNotLiked = await this.memeRepository.recentMemesNotLiked(
      userId,
      200,
    )

    const recommendations: Meme[] = []

    for (const meme of recentMemesNotLiked) {
      const userTagsMap: Map<string, number> = new Map()
      const memeTagsMap: Map<string, number> = new Map()

      for (const tag of last200Likes.flatMap((like) => like.getTags())) {
        const currentTagWeight = userTagsMap.get(tag.name) ?? 0
        userTagsMap.set(tag.name, currentTagWeight + tag.weight)
      }

      for (const tag of meme.getTags()) {
        const currentTagWeight = memeTagsMap.get(tag.name) ?? 0
        memeTagsMap.set(tag.name, currentTagWeight + tag.weight)
      }

      const allTags = new Set([...userTagsMap.keys(), ...memeTagsMap.keys()])

      const normalizedUserTags = Array.from(allTags).map((tagName) => ({
        name: tagName,
        weight: 0,
      }))
      const normalizedMemeTags = Array.from(allTags).map((tagName) => ({
        name: tagName,
        weight: 0,
      }))

      Array.from(allTags).forEach((tagName, index) => {
        const userTagWeight = userTagsMap.get(tagName) ?? 0
        const memeTagWeight = memeTagsMap.get(tagName) ?? 0
        normalizedUserTags[index].weight = userTagWeight
        normalizedMemeTags[index].weight = memeTagWeight
      })

      const similarity = calculateSimilarity(
        normalizedUserTags,
        normalizedMemeTags,
      )

      if (similarity >= 0.45) {
        recommendations.push(meme)
      }
    }

    return {
      recommendations,
    }
  }
}

function calculateSimilarity(userTags: Tag[], memeTags: Tag[]): number {
  let dotProduct = 0
  let normUserTags = 0
  let normMemeTags = 0

  for (let i = 0; i < userTags.length; i++) {
    dotProduct += userTags[i].weight * memeTags[i].weight
    normUserTags += userTags[i].weight ** 2
    normMemeTags += memeTags[i].weight ** 2
  }

  normUserTags = Math.sqrt(normUserTags)
  normMemeTags = Math.sqrt(normMemeTags)

  const similarity = dotProduct / (normUserTags * normMemeTags)

  if (isNaN(similarity)) {
    return -1
  }

  return similarity
}
