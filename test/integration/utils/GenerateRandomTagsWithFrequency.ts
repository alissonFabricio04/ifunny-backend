export function generateRandomTagsWithFrequency(
  tags: { name: string }[],
  frequencies: number[],
  count = 3,
) {
  const result: { name: string }[] = []
  const totalFrequency = frequencies.reduce(
    (acc, frequency) => acc + frequency,
    0,
  )

  for (let i = 0; i < count; i++) {
    const randomValue = Math.random() * totalFrequency
    let cumulativeFrequency = 0
    let selectedTag: any

    for (let j = 0; j < tags.length; j++) {
      cumulativeFrequency += frequencies[j]
      if (randomValue <= cumulativeFrequency) {
        selectedTag = tags[j]
        break
      }
    }

    result.push(selectedTag)
  }

  return result
}
