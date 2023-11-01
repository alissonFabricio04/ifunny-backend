import { Id } from '../value-objects/id'
import { DomainError } from '../error/domain-error'

export type Content = {
  midia?: {
    postId: Id
  }
  text?: string
}

export class Comment {
  private id: Id
  private memeId: Id
  private authorId: Id
  private content: Content
  private qtyUpvotes: number
  private qtyDownvotes: number

  constructor(
    id: Id,
    memeId: Id,
    authorId: Id,
    content: Content,
    qtyUpvotes: number,
    qtyDownvotes: number,
  ) {
    this.setId(id)
    this.setMemeId(memeId)
    this.setAuthorId(authorId)
    this.setContent(content)
    this.setUpvotes(qtyUpvotes)
    this.setDownvotes(qtyDownvotes)
  }

  static create(memeId: Id, authorId: Id, content: Content) {
    return new Comment(Id.create(), memeId, authorId, content, 0, 0)
  }

  upvote() {
    const newQtyUpvotes = this.qtyUpvotes + 1
    this.setUpvotes(newQtyUpvotes)
  }

  downvote() {
    const newQtyDownvotes = this.qtyDownvotes + 1
    this.setDownvotes(newQtyDownvotes)
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

  getMemeId() {
    return this.memeId
  }

  private setMemeId(memeId: Id) {
    if (!(memeId satisfies Id) || !memeId || !('getId' in memeId)) {
      throw new DomainError('Id do meme não foi fornecido')
    }

    this.memeId = memeId
  }

  getAuthorId() {
    return this.authorId
  }

  private setAuthorId(authorId: Id) {
    if (!(authorId satisfies Id) || !authorId || !('getId' in authorId)) {
      throw new DomainError('Id do autor não foi fornecido')
    }

    this.authorId = authorId
  }

  getContent() {
    return this.content
  }

  private setContent(content: Content) {
    if (!content.midia?.postId && !content.text) {
      throw new DomainError('Não é possível fazer um comentario sem conteúdo')
    }

    this.content = content
  }

  getUpvotes() {
    return this.qtyUpvotes
  }

  private setUpvotes(qtyUpvote: number) {
    if (
      qtyUpvote < 0 ||
      isNaN(qtyUpvote) ||
      !isFinite(qtyUpvote) ||
      !Number.isSafeInteger(qtyUpvote)
    ) {
      throw new DomainError('Quantidade de upvotes invalida')
    }

    this.qtyUpvotes = qtyUpvote
  }

  getDownvotes() {
    return this.qtyDownvotes
  }

  private setDownvotes(qtyDownvotes: number) {
    if (
      qtyDownvotes < 0 ||
      isNaN(qtyDownvotes) ||
      !isFinite(qtyDownvotes) ||
      !Number.isSafeInteger(qtyDownvotes)
    ) {
      throw new DomainError('Quantidade de downvotes invalida')
    }

    this.qtyDownvotes = qtyDownvotes
  }
}
