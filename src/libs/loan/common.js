export const makeId = length => {
  const result = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i += 1) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

export const makeIdUpercase = length => {
  const result = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i += 1) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

export const increaseIndex = arr => {
  let index = 0
  if (arr.length > 0) {
    const idx = arr.indexOf(Math.max(...arr))
    index = arr[idx] + 1
  }
  return index
}
