import Id from '../../domain/Id'

type User = {
  userId: string
  username: string
  profilePicture: string
}

export interface UserQuery {
  getById: (userId: Id) => Promise<User | null>
}
