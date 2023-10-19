import { ContentWithFormatInvalidError } from '../errors/content-with-format-invalid-error'

export class Video {
  private _content: string

  constructor(content: string) {
    this.content = content
  }

  private set content(content: string) {
    if (!content || content.length <= 6) {
      throw new ContentWithFormatInvalidError()
    }

    if (
      !(
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
