import { Id } from '../value-objects/id'
import { Midia } from '../value-objects/midia'
import { DomainError } from '../error/domain-error'

export type Tag = {
  name: string
  weight: number
}

type StatusMeme = {
  status: 'VISIBLE' | 'INVISIBILITY'
}

export class Meme {
  private id: Id
  private authorId: Id
  private content: Midia
  private tags: Array<Tag>
  private qtyUpvotes: number
  private qtyDownvotes: number
  private status: StatusMeme

  constructor(
    id: Id,
    authorId: Id,
    content: Midia,
    tags: Array<Tag>,
    qtyUpvotes: number,
    qtyDownvotes: number,
    status: StatusMeme,
  ) {
    this.setId(id)
    this.setAuthorId(authorId)
    this.setContent(content)
    this.setTags(tags)
    this.setUpvotes(qtyUpvotes)
    this.setDownvotes(qtyDownvotes)
    this.status = status
  }

  static create(authorId: Id, content: Midia, tags: Array<Tag>) {
    return new Meme(Id.create(), authorId, content, tags, 0, 0, {
      status: 'VISIBLE',
    })
  }

  addTag(tag: Tag) {
    if (this.getTags().length > 20) {
      throw new DomainError('Limite de tags atingido')
    }

    const newTags = [...this.tags, tag]
    this.setTags(newTags)
  }

  removeTag(tag: Tag) {
    const newTags = this.getTags().filter(
      (current) => current.name.toUpperCase() !== tag.name.toUpperCase(),
    )

    this.setTags(newTags)
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

  private setContent(content: Midia) {
    if (!(content satisfies Midia) || !content || !('getContent' in content)) {
      throw new DomainError('Não é possível fazer um meme sem conteúdo')
    }

    this.content = content
  }

  getTags() {
    return this.tags
  }

  private setTags(tags: Array<Tag>) {
    if (!(tags satisfies Array<Tag>) || !tags) {
      throw new DomainError('Tag com formato inválido')
    }

    if (tags.length <= 0) {
      throw new DomainError('Tag não foi fornecido')
    }

    if (tags.length > 20) {
      throw new DomainError('Limite de tags atingido')
    }

    for (let index = 0; index < tags.length; index++) {
      if (!tags[index].name || tags[index].name.length > 100) {
        throw new DomainError('Tag com formato inválido')
      }

      if (
        tags[index].weight < 0 ||
        isNaN(tags[index].weight) ||
        !isFinite(tags[index].weight) ||
        !Number.isSafeInteger(tags[index].weight)
      ) {
        throw new DomainError('Peso da tag invalido')
      }

      tags[index].name = tags[index].name.toLowerCase()
    }

    this.tags = tags
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

  getStatus() {
    return this.status
  }
}
