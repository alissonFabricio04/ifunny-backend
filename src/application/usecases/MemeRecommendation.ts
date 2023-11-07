/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import MemeQuery from '../queries/MemeQuery'

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
  recommendations: {
    similarity: number
    memeId: string
    authorId: string
    content: string
    tags: { name: string }[]
    upvotes: number
  }[]
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
    const recommendations = []
    for (const memeNotLiked of recentMemesNotLiked) {
      const tagsFromMemesNotLiked = this.getTagsMemes([memeNotLiked])
      const similarity = this.calculeteSimilarity(
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
        const currentTagWeight = tagMap.get(tag.name) ?? 1
        tagMap.set(tag.name, currentTagWeight + 1)
      }
    }
    return tagMap
  }

  private calculeteSimilarity(
    tagsFromMemesNotLiked: Map<string, number>,
    userTagsPreferences: Map<string, number>,
  ) {
    const [dotProduct, normMemeTags, normUserPreferences] = this.calculateSigma(
      tagsFromMemesNotLiked,
      userTagsPreferences,
    )
    const sqrtNormMemeTags = Math.sqrt(normMemeTags)
    const sqrtNormUserPref = Math.sqrt(normUserPreferences)
    const similarity = dotProduct / (sqrtNormMemeTags * sqrtNormUserPref)
    return similarity
  }

  private calculateSigma(
    tags01: Map<string, number>,
    tags02: Map<string, number>,
  ) {
    let dotProduct = 0
    let normTag01 = 0
    let normTag02 = 0
    for (const [tagName, tf] of tags01.entries()) {
      const tagWeight = tags02.get(tagName) ?? 1
      dotProduct += tf * tagWeight
      normTag01 += tf ** 2
      normTag02 += tagWeight ** 2
    }

    return [dotProduct, normTag01, normTag02]
  }
}
