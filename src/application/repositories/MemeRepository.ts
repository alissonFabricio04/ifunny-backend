import Id from '../../domain/Id'
import Meme from '../../domain/Meme'

export default interface MemeRepository {
  save: (meme: Meme) => Promise<void>
  get: (memeId: Id) => Promise<Meme | null>
  update: (meme: Meme) => Promise<void>
  updateVotes: (userId: Id, meme: Meme) => Promise<void>
  alreadyLikeMeme: (userId: Id, memeId: Id) => Promise<boolean>
  alreadyDislikeMeme: (userId: Id, memeId: Id) => Promise<boolean>
}
