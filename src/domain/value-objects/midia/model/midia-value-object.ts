import { ContentWithFormatInvalidError } from '../errors/content-with-format-invalid-error'

export class Midia {
  private _content: string

  constructor(content: string) {
    this.content = content
  }

  private set content(content: string) {
    if (!content || content.length <= 21) {
      throw new ContentWithFormatInvalidError()
    }

    if (
      !(
        content.startsWith('data:image/jpeg;base64') || 
        content.startsWith('data:image/png;base64') ||
        content.startsWith('data:image/gif;base64') ||
        content.startsWith('data:image/webp;base64') || 
        content.startsWith('data:video/mp4;base64') ||
        content.startsWith('data:video/webm;base64')
      )
    ) {
      throw new ContentWithFormatInvalidError()
    }

    this._content = content
  }

  public toString(): string {
    return this._content
  }
}
