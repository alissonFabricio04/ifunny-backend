/* eslint-disable no-useless-constructor */

import MemeQuery from '../queries/MemeQuery'
import Id from '../../domain/Id'

type Meme = {
  memeId: string
  authorId: string
  content: string
  tags: { name: string }[]
  upvotes: number
}

type Input = {
  userId: string
}

type Recommendation = {
  similarity: number
  memeId: string
  authorId: string
  content: string
  tags: { name: string }[]
  upvotes: number
}

type Output = {
  recommendations: Recommendation[]
}

export default class MemeRecommendation {
  constructor(readonly memeQuery: MemeQuery) {}

  async handle(input: Input): Promise<Output> {
    const userId = new Id(input.userId)
    const last200Likes = await this.memeQuery.lastLikes(userId, 200)
    const recentMemesNotLiked = await this.memeQuery.recentMemesNotLiked(
      userId,
      200,
    )

    const userTagsPreferences = this.getTagsMemes(last200Likes)
    const recommendations: Recommendation[] = []

    for (const memeNotLiked of recentMemesNotLiked) {
      const tagsFromMemesNotLiked = this.getTagsMemes([memeNotLiked])
      const similarity = this.calculateSimilarity(
        tagsFromMemesNotLiked,
        userTagsPreferences,
      )

      if (similarity >= 0.5) {
        recommendations.push({
          similarity,
          ...memeNotLiked,
        })
      }
    }

    return {
      recommendations,
    }
  }

  private getTagsMemes(memes: Meme[]) {
    const tagMap: Map<string, number> = new Map()
    for (const meme of memes) {
      for (const tag of meme.tags) {
        tagMap.set(tag.name, (tagMap.get(tag.name) || 0) + 1)
      }
    }
    return tagMap
  }

  private calculateSimilarity(
    tagsFromMemesNotLiked: Map<string, number>,
    userTagsPreferences: Map<string, number>,
  ) {
    let dotProduct = 0
    let normTag01 = 0
    let normTag02 = 0

    for (const [tagName, tf] of tagsFromMemesNotLiked.entries()) {
      const tagWeight = userTagsPreferences.get(tagName) || 0
      dotProduct += tf * tagWeight
      normTag01 += tf ** 2
      normTag02 += tagWeight ** 2
    }

    const sqrtNormTag01 = Math.sqrt(normTag01)
    const sqrtNormTag02 = Math.sqrt(normTag02)
    const normalizationFactor = sqrtNormTag01 * sqrtNormTag02
    const similarity =
      normalizationFactor === 0 ? 0 : dotProduct / normalizationFactor

    return similarity
  }
}
