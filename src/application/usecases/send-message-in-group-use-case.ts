import { Group } from '../../domain/entities/group'
import { Id } from '../../domain/value-objects/id'
import { GroupRepository } from '../repositories/group-repository'
import { UseCaseError } from './error/usecase-error'

interface Input {
  userId: string
  groupId: string
  message: string
}

export class SendMessageInGroupUseCase {
  readonly groupRepository: GroupRepository

  constructor(groupRepository: GroupRepository) {
    this.groupRepository = groupRepository
  }

  async handle(input: Input): Promise<void> {
    const userId = new Id(input.userId)
    const groupId = new Id(input.groupId)

    // valida se o grupo esta ativo (se o pagamento esta em dia), se n estiver, n envia a mensagem, se sim envia
  }
}
