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
    if (value.includes(':text/ascii')) {
      this.value = Buffer.from(value, 'base64').toString('utf8')
    }
    throw new Error('Extensão de arquivo não suportada')
  }

  getContent() {
    return this.value
  }
}
