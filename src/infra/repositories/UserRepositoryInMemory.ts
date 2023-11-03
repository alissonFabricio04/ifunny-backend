import { UserQuery } from '../../application/queries/UserQuery'
import UserRepository from '../../application/repositories/UserRepository'
import Id from '../../domain/Id'
import Name from '../../domain/Name'
import User from '../../domain/User'

export default class UserRepositoryInMemory
  implements UserRepository, UserQuery
{
  users: User[] = []

  async save(user: User) {
    this.users.push(user)
  }

  async get(userId: Id) {
    const user = this.users.find(
      (user) => user.userId.getValue() === userId.getValue(),
    )

    return user || null
  }

  async getByUsername(username: Name) {
    const user = this.users.find(
      (user) => user.getUsername() === username.getValue(),
    )

    return user || null
  }

  async update(user: User) {
    this.users = this.users.filter((u) => {
      if (u.userId.getValue() === user.userId.getValue()) {
        return user
      }

      return u
    })
  }

  async getById(userId: Id) {
    const user = this.users.find(
      (user) => user.userId.getValue() === userId.getValue(),
    )

    if (!user) {
      return null
    }

    return {
      userId: user.userId.getValue(),
      username: user.getUsername(),
      profilePicture: user.getProfilePicture().getValue(),
    }
  }
}
