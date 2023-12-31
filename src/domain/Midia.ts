import Image from './Image'
import Video from './Video'

export default class Midia {
  private value: Video | Image | string

  constructor(value: string) {
    if (value.includes(':image/')) {
      this.value = new Image(value)
      return
    }
    if (value.includes(':video/')) {
      this.value = new Video(value)
      return
    }
    if (value.includes(':text/utf8')) {
      this.value = value
      return
    }
    throw new Error('Extensão de arquivo não suportada')
  }

  getContent(): string {
    if (this.value instanceof Image || this.value instanceof Video) {
      return this.value.getValue()
    }

    const value = this.value.replace('data:text/utf8;base64,', '')
    return Buffer.from(value, 'base64').toString('utf8')
  }
}
