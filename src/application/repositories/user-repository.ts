import { Id } from '../../domain/value-objects/id'
import { User } from '../../domain/entities/user'

export interface UserRepository {
  save: (user: User) => Promise<void>
  get: (userId: Id) => Promise<User | null>
  getByUsername: (username: string) => Promise<User | null>
}
