/* eslint-disable no-useless-escape */

import { Id } from '../value-objects/id'
import { Image } from '../value-objects/image'
import { DomainError } from '../error/domain-error'

type StatusGroup = {
  status: 'ONLINE' | 'LATE_PAYMENT'
}

export class Group {
  private id: Id
  private name: string
  private ownerId: Id
  private thumbnail: Image
  private status: StatusGroup

  constructor(
    id: Id,
    name: string,
    ownerId: Id,
    thumbnail: Image,
    status: StatusGroup,
  ) {
    this.setId(id)
    this.setName(name)
    this.setOwnerId(ownerId)
    this.setThumbnail(thumbnail)
    this.status = status
  }

  static create(name: string, ownerId: Id, thumbnail?: string) {
    if (!thumbnail) {
      return new Group(Id.create(), name, ownerId, Image.createDefault(), {
        status: 'ONLINE',
      })
    }

    return new Group(Id.create(), name, ownerId, new Image(thumbnail), {
      status: 'ONLINE',
    })
  }

  paymentMade() {
    this.status = {
      status: 'ONLINE',
    }
  }

  latePayment() {
    this.status = {
      status: 'LATE_PAYMENT',
    }
  }

  changeName(newGroupName: string) {
    this.setName(newGroupName)
  }

  changeThumbnail(newThumbnail: Image) {
    this.setThumbnail(newThumbnail)
  }

  getId() {
    return this.id
  }

  private setId(id: Id) {
    if (!(id satisfies Id) || !id || !('getId' in id)) {
      throw new DomainError('Id não foi fornecido')
    }

    this.id = id
  }

  getName(): string {
    return this.name
  }

  private setName(name: string) {
    if (!name) {
      throw new DomainError('Nome da pasta não foi fornecido')
    }

    if (name.length <= 1) {
      throw new DomainError('Nome de pasta muito curto')
    }

    if (name.length > 40) {
      throw new DomainError('Nome de pasta muito longo')
    }

    const specialCharsPattern = /[!@#$%^&*()#+{}\[\]:;''<>,.?~`|\\\/\-]/

    if (specialCharsPattern.test(name)) {
      throw new DomainError(
        'Nome de pasta não deve possuir caracteres especias',
      )
    }

    this.name = name
  }

  getOwnerId() {
    return this.ownerId
  }

  private setOwnerId(ownerId: Id) {
    if (!(ownerId satisfies Id) || !ownerId || !('getId' in ownerId)) {
      throw new DomainError('Id do autor não foi fornecido')
    }

    this.ownerId = ownerId
  }

  getThumbnail(): Image {
    return this.thumbnail
  }

  private setThumbnail(thumbnail: Image) {
    if (
      !(thumbnail satisfies Image) ||
      !thumbnail ||
      !('content' in thumbnail)
    ) {
      throw new DomainError('Thumbnail não foi fornecido')
    }

    this.thumbnail = thumbnail
  }

  getStatus() {
    return this.status
  }
}
