import { Id } from '../../entities/id/model/id-value-object'
import { MemeGateway } from '../../entities/meme/gateways/meme-gateway'
import { Meme } from '../../entities/meme/model/meme'
import { UseCase, InDTO, OutDTO } from '../user-case'

interface InputDTO {
  userId: string
}

interface OutputDTO {
  recommendations: Array<Meme>
}

export class FeedMemeUseCase
  implements UseCase<MemeGateway, InputDTO, OutputDTO>
{
  readonly gateway: MemeGateway
  
  constructor(gateway: MemeGateway) {
    this.gateway = gateway
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const userLast20Likes = await this.gateway.lastLikes(
      new Id(inputDTO.data.userId),
      200,
    )
    const recentMemesNotLikedByUser = await this.gateway.recentMemesNotLikedByUser(
      new Id(inputDTO.data.userId),
      200
    )

    const userPreferencesMap: Map<string, number> = new Map()
    for (const like of userLast20Likes) {
      for (const tag of like.tags) {
        const currentTagWeight = userPreferencesMap.get(tag.name) ?? 0
        userPreferencesMap.set(tag.name, currentTagWeight + tag.weight)
      }
    }

    const recommendations: Array<Meme> = []

    for (const meme of recentMemesNotLikedByUser) {
      const memeTagsMap: Map<string, number> = new Map()
      for (const tag of meme.tags) {
        const currentTagWeight = (memeTagsMap.get(tag.name) ?? 0)
        memeTagsMap.set(tag.name, currentTagWeight + tag.weight)
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
      const sqrtNormUserPreferences = Math.sqrt(normUserPreferences)

      let similarity = dotProduct / (sqrtNormMemeTags * sqrtNormUserPreferences)
      isNaN(similarity) ? similarity = -1 : null

      if (similarity >= 0.5) {
        recommendations.push(meme)
      }
    }

    return {
      status: 'SUCCESS',
      data: {
        recommendations,
      },
    }
  }
}
