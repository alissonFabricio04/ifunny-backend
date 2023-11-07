export function getRandomNumber(max = 200, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
