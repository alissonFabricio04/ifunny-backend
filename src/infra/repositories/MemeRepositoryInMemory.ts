import MemeQuery, { Meme as MemeDTO } from '../../application/queries/MemeQuery'
import MemeRepository from '../../application/repositories/MemeRepository'
import Id from '../../domain/Id'
import Meme from '../../domain/Meme'

export default class MemeRepositoryInMemory
  implements MemeRepository, MemeQuery
{
  memes: Meme[] = []
  likeMemes: { userId: Id; memeId: Id; meme: Meme }[] = []
  dislikeMemes: { userId: Id; memeId: Id; meme: Meme }[] = []

  async save(meme: Meme) {
    this.memes.push(meme)
  }

  async get(memeId: Id) {
    const meme = this.memes.find(
      (meme) => meme.memeId.getValue() === memeId.getValue(),
    )
    return meme || null
  }

  async update(meme: Meme) {
    this.memes = this.memes.filter((m) => {
      if (m.memeId.getValue() === meme.memeId.getValue()) {
        return meme
      }
      return m
    })
  }

  async updateVotes(userId: Id, meme: Meme) {
    this.memes = this.memes.filter((m) => {
      if (m.memeId.getValue() === meme.memeId.getValue()) {
        if (m.getUpvotes() > meme.getUpvotes()) {
          this.dislikeMemes.push({
            userId,
            memeId: meme.memeId,
            meme,
          })
        } else {
          this.likeMemes.push({
            userId,
            memeId: meme.memeId,
            meme,
          })
        }
        return meme
      }
      return m
    })
  }

  async alreadyLikeThisMeme(userId: Id, memeId: Id) {
    const like = this.likeMemes.find((like) => {
      const itsSameUser = like.userId.getValue() === userId.getValue()
      const itsSameMeme = memeId.getValue() === like.memeId.getValue()
      if (itsSameUser && itsSameMeme) {
        return like
      }
      return undefined
    })
    return !!like
  }

  async alreadyDislikeThisMeme(userId: Id, memeId: Id) {
    const dislike = this.dislikeMemes.find((dislike) => {
      const itsSameUser = dislike.userId.getValue() === userId.getValue()
      const itsSameMeme = memeId.getValue() === dislike.memeId.getValue()
      if (itsSameUser && itsSameMeme) {
        return dislike
      }
      return undefined
    })
    return !!dislike
  }

  async recentMemesNotLiked(userId: Id) {
    const memesNotLiked: MemeDTO[] = []
    this.memes.forEach(async (meme) => {
      const alreadyLikedMeme = await this.alreadyLikeThisMeme(
        userId,
        meme.memeId,
      )
      if (!alreadyLikedMeme) {
        memesNotLiked.push({
          memeId: meme.memeId.getValue(),
          authorId: meme.authorId.getValue(),
          content: meme.content.getContent(),
          tags: meme.getTags().map((tag) => ({ name: tag.getName() })),
          upvotes: meme.getUpvotes(),
        })
      }
    })

    return memesNotLiked
  }

  async lastLikes() {
    const lastLikes: MemeDTO[] = []
    this.likeMemes.forEach(({ meme }) => {
      lastLikes.push({
        memeId: meme.memeId.getValue(),
        authorId: meme.authorId.getValue(),
        content: meme.content.getContent(),
        tags: meme.getTags().map((tag) => ({ name: tag.getName() })),
        upvotes: meme.getUpvotes(),
      })
    })

    return lastLikes
  }

  async highlights() {
    const highlights: MemeDTO[] = []
    const max = 100
    const min = 10
    for (let index = 0; index < 100; index++) {
      const meme = this.memes[Math.floor(Math.random() * (max - min + 1)) + min]
      highlights.push({
        memeId: meme.memeId.getValue(),
        authorId: meme.authorId.getValue(),
        content: meme.content.getContent(),
        tags: meme.getTags().map((tag) => ({ name: tag.getName() })),
        upvotes: meme.getUpvotes(),
      })
    }
    return highlights
  }

  async collective() {
    const collective: MemeDTO[] = []
    const max = 100
    const min = 10
    for (let index = 0; index < 100; index++) {
      const meme = this.memes[Math.floor(Math.random() * (max - min + 1)) + min]
      collective.push({
        memeId: meme.memeId.getValue(),
        authorId: meme.authorId.getValue(),
        content: meme.content.getContent(),
        tags: meme.getTags().map((tag) => ({ name: tag.getName() })),
        upvotes: meme.getUpvotes(),
      })
    }
    return collective
  }
}
