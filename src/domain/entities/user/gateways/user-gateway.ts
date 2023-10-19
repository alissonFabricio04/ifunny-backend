import { User } from '../model/user'

export interface UserGateway {
  save: (user: User) => Promise<void>
  find: (username: string) => Promise<User | null>
}
