import Id from './Id'

export default class Content {
  private midiaId: Id

  constructor(
    readonly body: string = '',
    midiaId?: string,
  ) {
    if (midiaId) this.midiaId = new Id(midiaId)
    if (!body && midiaId) throw new Error('Conteúdo com formato invalido')
  }

  getMidiaId() {
    return this.midiaId
  }
}
