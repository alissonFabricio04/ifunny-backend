/* eslint-disable no-useless-constructor */

import Name from './Name'
import Id from './Id'
import Image from './Image'

export default class Folder {
  private constructor(
    readonly folderId: Id,
    private name: Name,
    readonly ownerId: Id,
    private thumbnail: Image,
    private memes: Id[],
  ) {}

  changeName(newFolderName: string) {
    this.name = new Name(newFolderName)
  }

  changeThumbnail(newThumbnail: string) {
    this.thumbnail = new Image(newThumbnail)
  }

  repub(memeId: string) {
    this.memes.push(new Id(memeId))
  }

  static create(name: string, ownerId: string, thumbnail?: string) {
    if (!thumbnail) {
      return new Folder(
        Id.create(),
        new Name(name),
        new Id(ownerId),
        Image.createDefault(),
        [],
      )
    }
    return new Folder(
      Id.create(),
      new Name(name),
      new Id(ownerId),
      new Image(thumbnail),
      [],
    )
  }

  static restore(
    folderId: string,
    name: string,
    ownerId: string,
    thumbnail: string,
    memes: { id: string }[],
  ) {
    return new Folder(
      new Id(folderId),
      new Name(name),
      new Id(ownerId),
      new Image(thumbnail),
      memes.map((meme) => new Id(meme.id)),
    )
  }

  getName() {
    return this.name.getValue()
  }

  getThumbnail(): Image {
    return this.thumbnail
  }

  getMemes() {
    return this.memes
  }
}
