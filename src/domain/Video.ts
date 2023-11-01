export default class Video {
  private value: string

  constructor(value: string) {
    if (!value || value.length <= 6) {
      throw new Error('Extensão de arquivo não suportada')
    }
    if (
      !(
        value.startsWith('data:video/mp4;base64') ||
        value.startsWith('data:video/webm;base64')
      )
    ) {
      throw new Error('Extensão de arquivo não suportada')
    }
    this.value = value
  }

  getValue() {
    return this.value
  }
}
