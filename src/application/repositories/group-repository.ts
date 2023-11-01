import { Id } from '../../domain/value-objects/id'
import { Group } from '../../domain/entities/group'

export interface GroupRepository {
  save: (group: Group) => Promise<void>
  get: (groupId: Id) => Promise<Group | null>
  getByName: (userId: Id, groupName: string) => Promise<boolean>
  isVip: (userId: Id) => Promise<boolean>
}
