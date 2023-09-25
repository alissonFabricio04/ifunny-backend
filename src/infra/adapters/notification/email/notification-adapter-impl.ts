import { NotificationAdapter } from '../../../../adapters/notification-adapter'
import { User } from '../../../../entities/user/model/user'

export class NotificationAdapterImpl implements NotificationAdapter<string> {
  async send(to: User, subject: string, content: { body: string }) {
    await new Promise((resolve) => resolve(null))
  }
}
