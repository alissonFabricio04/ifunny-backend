import { Id } from '../../entities/id/model/id-value-object';
import { MemeGateway } from '../../entities/meme/gateways/meme-gateway';
import { Meme, Tag } from '../../entities/meme/model/meme';
import { UseCase, InDTO, OutDTO } from '../user-case';

interface InputDTO {
  userId: string;
}

interface OutputDTO {
  recommendations: Array<Meme>;
}

export class FeedMemeUseCase
  implements UseCase<MemeGateway, InputDTO, OutputDTO>
{
  readonly gateway: MemeGateway;

  constructor(gateway: MemeGateway) {
    this.gateway = gateway;
  }

  async handle(inputDTO: InDTO<InputDTO>): Promise<OutDTO<OutputDTO>> {
    const userLast20Likes = await this.gateway.lastLikes(
      new Id(inputDTO.data.userId),
      200
    );
    const recentMemesNotLikedByUser = await this.gateway.recentMemesNotLikedByUser(
      new Id(inputDTO.data.userId),
      200
    );

    const recommendations: Array<Meme> = [];

    for (const meme of recentMemesNotLikedByUser) {
      const userTagsMap: Map<string, number> = new Map();
      const memeTagsMap: Map<string, number> = new Map();

      for (const tag of userLast20Likes.flatMap((like) => like.tags)) {
        const currentTagWeight = userTagsMap.get(tag.name) ?? 0;
        userTagsMap.set(tag.name, currentTagWeight + tag.weight);
      }

      for (const tag of meme.tags) {
        const currentTagWeight = memeTagsMap.get(tag.name) ?? 0;
        memeTagsMap.set(tag.name, currentTagWeight + tag.weight);
      }

      const allTags = new Set([...userTagsMap.keys(), ...memeTagsMap.keys()]);

      const normalizedUserTags = Array.from(allTags).map((tagName) => ({
        name: tagName,
        weight: 0,
      }));
      const normalizedMemeTags = Array.from(allTags).map((tagName) => ({
        name: tagName,
        weight: 0,
      }));

      Array.from(allTags).forEach((tagName, index) => {
        const userTagWeight = userTagsMap.get(tagName) ?? 0;
        const memeTagWeight = memeTagsMap.get(tagName) ?? 0;
        normalizedUserTags[index].weight = userTagWeight;
        normalizedMemeTags[index].weight = memeTagWeight;
      });

      const similarity = this.calculateSimilarity(normalizedUserTags, normalizedMemeTags);

      if (similarity >= 0.5) {
        recommendations.push(meme);
      }
    }

    return {
      status: 'SUCCESS',
      data: {
        recommendations,
      },
    };
  }

  private calculateSimilarity(userTags: Array<Tag>, memeTags: Array<Tag>): number {
    let dotProduct = 0;
    let normUserTags = 0;
    let normMemeTags = 0;
  
    for (let i = 0; i < userTags.length; i++) {
      dotProduct += userTags[i].weight * memeTags[i].weight;
      normUserTags += userTags[i].weight ** 2;
      normMemeTags += memeTags[i].weight ** 2;
    }
  
    normUserTags = Math.sqrt(normUserTags);
    normMemeTags = Math.sqrt(normMemeTags);
  
    const similarity = dotProduct / (normUserTags * normMemeTags);
  
    return isNaN(similarity) ? -1 : similarity;
  }
}

