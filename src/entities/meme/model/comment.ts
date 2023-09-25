import { Id } from '../../id/model/id-value-object'
import { CommentWithoutContentError } from '../errors/comment-without-content-error'
import { IdWasNotProvidedError } from '../errors/id-was-not-provided-error'

export type Content = {
  midia?: {
    postId: Id
  }
  text?: string
}

export class Comment {
  constructor(
    private _id: Id,
    private _memeId: Id,
    private _authorId: Id,
    private _content: Content,
  ) {
    this.id = _id
    this.memeId = _memeId
    this.authorId = _authorId
    this.content = _content
  }

  public get id() {
    return this._id
  }

  private set id(id: Id) {
    if (!(id satisfies Id) || !id || !('id' in id)) {
      throw new IdWasNotProvidedError()
    }

    this._id = id
  }

  public get memeId() {
    return this._memeId
  }

  private set memeId(memeId: Id) {
    if (!(memeId satisfies Id) || !memeId || !('id' in memeId)) {
      throw new IdWasNotProvidedError()
    }

    this._memeId = memeId
  }

  public get authorId() {
    return this._authorId
  }

  private set authorId(authorId: Id) {
    if (!(authorId satisfies Id) || !authorId || !('id' in authorId)) {
      throw new IdWasNotProvidedError()
    }

    this._authorId = authorId
  }

  public get content() {
    return this._content
  }

  private set content(content: Content) {
    if (!content.midia && !content.text) {
      throw new CommentWithoutContentError()
    }

    this._content = content
  }
}
