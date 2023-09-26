import { Id } from '../../entities/id/model/id-value-object'
import { MemeGateway } from '../../entities/meme/gateways/meme-gateway'
import { Meme } from '../../entities/meme/model/meme'
import { InDTO, OutDTO, UseCase } from '../user-case'

interface InputDTO {
  userId: string
  alreadySeen: Array<{ id: string }>
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
      new Id(inputDTO.data.userId ?? 'failed'),
      20,
    )
    const memesInLast1h = await this.gateway.memesInLast1h(
      userLast20Likes.length,
    )

    const userPreferencesMap: Map<string, number> = new Map()
    for (const like of userLast20Likes) {
      for (const tag of like.tags) {
        if (!userPreferencesMap.has(tag.name)) {
          userPreferencesMap.set(tag.name, tag.weight)
        }
      }
    }
    const userPreferencesArray = Array.from(userPreferencesMap.values())

    const recommendations: Array<Meme> = []

    for (const meme of memesInLast1h) {
      if (
        inputDTO.data.alreadySeen.some(
          (memeAlreadySeen) => memeAlreadySeen.id === meme.id.toString(),
        )
      ) {
        continue
      }

      const memeTagsMap: Map<string, number> = new Map()
      for (const tag of meme.tags) {
        if (!memeTagsMap.has(tag.name)) {
          memeTagsMap.set(tag.name, tag.weight)
        }
      }

      let dotProduct = 0
      let normMemeTags = 0
      let normUserPreferences = 0

      let count = 0
      memeTagsMap.forEach((value) => {
        dotProduct += value * userPreferencesArray[count]
        normMemeTags += value ** 2
        normUserPreferences += userPreferencesArray[count] ** 2
        count++
      })

      normMemeTags = Math.sqrt(normMemeTags)
      normUserPreferences = Math.sqrt(normUserPreferences)

      const similarity = dotProduct / (normMemeTags * normUserPreferences)

      if (similarity > 0.5) {
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
