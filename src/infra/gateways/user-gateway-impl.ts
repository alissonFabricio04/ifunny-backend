import { Email } from '../../entities/email/model/email-value-object'
import { Id } from '../../entities/id/model/id-value-object'
import { UserGateway } from '../../entities/user/gateways/user-gateway'
import { User } from '../../entities/user/model/user'
import { prismaORM } from '../config/prisma-config'

export class UserGatewayImpl implements UserGateway {
  readonly prismaORM = prismaORM

  async save(user: User) {
    await this.prismaORM.users.create({
      data: {
        id: user.id.toString(),
        username: user.username,
        email: user.email.toString(),
        password: user.password || '',
      },
    })
  }

  async find(username: string) {
    const userExists = await this.prismaORM.users.findUnique({
      where: {
        username,
      },
    })

    if (!userExists) {
      return null
    }

    return new User(
      new Id(userExists.id),
      userExists.username,
      new Email(userExists.email),
      userExists.is_active,
      userExists.password
    )
  }
}
