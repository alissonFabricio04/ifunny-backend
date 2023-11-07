import { remove } from 'diacritics'

export default class Tag {
  private name: string
  private weight: number

  constructor(name: string, weight = 0) {
    if (!name || name.length <= 0) throw new Error('Tag com formato inválido')
    if (name.length > 100) throw new Error('Nome de tag muito longo')
    if (
      weight < 0 ||
      isNaN(weight) ||
      !isFinite(weight) ||
      !Number.isSafeInteger(weight)
    ) {
      throw new Error('Peso da tag invalido')
    }
    name = remove(name).toLowerCase()
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
