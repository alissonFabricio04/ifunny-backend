import { User } from "../entities/user/model/user";

export interface NotificationAdapter<T> {
  send: (to: User, subject: string, content: { body: T }) => Promise<void>
}