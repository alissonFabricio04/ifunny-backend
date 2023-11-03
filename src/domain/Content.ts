import Id from './Id'

export default class Content {
  private midiaId: Id

  constructor(
    readonly body: string = '',
    midiaId?: string,
  ) {
    if (!body && !midiaId) throw new Error('Conteúdo com formato invalido')
    if (midiaId) this.midiaId = new Id(midiaId)
  }

  getMidiaId() {
    return this.midiaId
  }
}
