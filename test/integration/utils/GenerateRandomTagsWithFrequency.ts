import { getRandomNumber } from './GetRandomNumber'

type Tag = {
  name: string
}

export function generateRandomTagsWithFrequency(
  tags: Tag[],
  frequencies: number[],
  count = getRandomNumber(10),
) {
  const result: Tag[] = []
  const totalFrequency = frequencies.reduce(
    (acc, frequency) => acc + frequency,
    0,
  )

  for (let i = 0; i < count; i++) {
    const randomValue = Math.random() * totalFrequency
    let cumulativeFrequency = 0
    let selectedTag: Tag | null = null

    for (let j = 0; j < tags.length; j++) {
      cumulativeFrequency += frequencies[j]
      if (randomValue <= cumulativeFrequency) {
        selectedTag = tags[j]
        break
      }
    }

    if (selectedTag) {
      result.push(selectedTag)
    }
  }

  return result
}
