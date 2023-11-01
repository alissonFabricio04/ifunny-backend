/* eslint-disable no-useless-constructor */

import Meme from './Meme'

export default abstract class Status {
  abstract value: string

  constructor(readonly meme: Meme) {}

  abstract visible(): void
  abstract invisible(): void
}

export class VisibleStatus extends Status {
  value: string

  constructor(meme: Meme) {
    super(meme)
    this.value = 'visible'
  }

  visible(): void {
    throw new Error('Status invalido')
  }

  invisible(): void {
    this.meme.setStatus(new InvisibleStatus(this.meme))
  }
}

export class InvisibleStatus extends Status {
  value: string

  constructor(meme: Meme) {
    super(meme)
    this.value = 'invisible'
  }

  visible(): void {
    this.meme.setStatus(new VisibleStatus(this.meme))
  }

  invisible(): void {
    throw new Error('Status invalido')
  }
}

export class StatusFactory {
  static create(meme: Meme, status: string) {
    if (status === 'visible') return new VisibleStatus(meme)
    if (status === 'invisible') return new InvisibleStatus(meme)
    throw new Error('Status invalido')
  }
}
