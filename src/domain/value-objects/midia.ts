import { DomainError } from '../error/domain-error'
import { Image } from './image'
import { Video } from './video'

export class Midia {
  private value: Video | Image

  constructor(content: string) {
    this.setContent(content)
  }

  getContent() {
    return this.value.getContent()
  }

  private setContent(content: string) {
    if (content.includes(':image/')) {
      this.value = new Image(content)
      return
    }

    if (content.includes(':video/')) {
      this.value = new Video(content)
      return
    }

    throw new DomainError('Extensão de arquivo não suportada')
  }
}
