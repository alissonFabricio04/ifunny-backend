import Id from '../../domain/Id'
import Name from '../../domain/Name'
import User from '../../domain/User'

export default interface UserRepository {
  save: (user: User) => Promise<void>
  get: (userId: Id) => Promise<User | null>
  getByUsername: (username: Name) => Promise<User | null>
  update: (user: User) => Promise<void>
}
