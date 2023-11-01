import { DomainError } from '../error/domain-error'

export class Video {
  private value: string

  constructor(content: string) {
    this.setContent(content)
  }

  getContent() {
    return this.value
  }

  private setContent(content: string) {
    if (!content || content.length <= 6) {
      throw new DomainError('Extensão de arquivo não suportada')
    }

    if (
      !(
        content.startsWith('data:video/mp4;base64') ||
        content.startsWith('data:video/webm;base64')
      )
    ) {
      throw new DomainError('Extensão de arquivo não suportada')
    }

    this.value = content
  }
}
