import { Group } from '../../domain/entities/group'
import { Id } from '../../domain/value-objects/id'
import { GroupRepository } from '../repositories/group-repository'
import { UseCaseError } from './error/usecase-error'

interface Input {
  userId: string
  groupName: string
  thumbnail?: string
}

export class CreateNewGroupUseCase {
  readonly groupRepository: GroupRepository

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository
  }

  async handle(input: Input): Promise<void> {
    const ownerId = new Id(input.userId)
    const group = Group.create(input.groupName, ownerId, input.thumbnail)

    const alreadyGroupWithThisName = await this.groupRepository.getByName(
      ownerId,
      group.getName(),
    )

    if (alreadyGroupWithThisName) {
      throw new UseCaseError('Você já possui um grupo com esse nome')
    }

    const isVip = await this.groupRepository.isVip(ownerId)

    if (!isVip) {
      throw new UseCaseError('Você deve ser VIP para realizar está ação')
    }

    await this.groupRepository.save(group)
  }
}
