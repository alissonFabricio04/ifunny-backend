/* eslint-disable no-useless-constructor */

import Id from '../../domain/Id'
import { UserQuery } from '../queries/UserQuery'

type Input = {
  userId: string
}

type Output = {
  userId: string
  username: string
  profilePicture: string
}

export default class GetUser {
  constructor(readonly userQuery: UserQuery) {}

  async handle(input: Input): Promise<Output> {
    const userExists = await this.userQuery.getById(new Id(input.userId))
    if (!userExists) throw new Error('Usuario não encontrado')
    return userExists
  }
}
