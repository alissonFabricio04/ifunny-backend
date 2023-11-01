/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import Tag from '../../domain/Tag'
import { MemeQuery } from '../queries/MemeQuery'

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

type Output = {
  recommendations: Meme[]
}

export class MemeRecommendation {
  constructor(readonly memeQuery: MemeQuery) {}

  async handle(input: Input): Promise<Output> {
    const userId = new Id(input.userId)
    const last200Likes = await this.memeQuery.lastLikes(userId, 200)
    const recentMemesNotLiked = await this.memeQuery.recentMemesNotLiked(
      userId,
      200,
    )

    const userPreferencesMap: Map<string, number> = new Map()
    for (const like of last200Likes) {
      for (const tag of like.tags) {
        const currentTagWeight = userPreferencesMap.get(tag.name) ?? 0
        userPreferencesMap.set(tag.name, currentTagWeight + 1)
      }
    }

    const recommendations: Meme[] = []
    for (const meme of recentMemesNotLiked) {
      const memeTagsMap: Map<string, number> = new Map()
      for (const tag of meme.tags) {
        const currentTagWeight = memeTagsMap.get(tag.name) ?? 0
        memeTagsMap.set(tag.name, currentTagWeight + 1)
      }

      let dotProduct = 0
      let normMemeTags = 0
      let normUserPreferences = 0
      for (const [tagName, tf] of memeTagsMap.entries()) {
        const tagWeight = userPreferencesMap.get(tagName) ?? 0
        dotProduct += tf * tagWeight
        normMemeTags += tf ** 2
        normUserPreferences += (tagWeight ?? 0) ** 2
      }

      const sqrtNormMemeTags = Math.sqrt(normMemeTags)
      const sqrtNormUserPref = Math.sqrt(normUserPreferences)

      let similarity = dotProduct / (sqrtNormMemeTags * sqrtNormUserPref)
      if (isNaN(similarity)) {
        similarity = -1
      }

      if (similarity >= 0.5) {
        recommendations.push(meme)
      }
    }

    return {
      recommendations,
    }
  }
}
