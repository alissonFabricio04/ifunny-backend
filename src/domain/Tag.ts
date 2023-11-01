export default class Tag {
  private name: string
  private weight: number

  constructor(name: string, weight = 0) {
    if (!name) throw new Error('Tag com formato inválido')
    if (name.length <= 0) throw new Error('Tag não foi fornecido')
    if (name.length > 100) throw new Error('Tag com formato inválido')
    if (
      weight < 0 ||
      isNaN(weight) ||
      !isFinite(weight) ||
      !Number.isSafeInteger(weight)
    ) {
      throw new Error('Peso da tag invalido')
    }
    name = name.toLowerCase()
    this.name = name
    this.weight = weight
  }

  getName() {
    return this.name
  }

  getWeight() {
    return this.weight
  }
}
