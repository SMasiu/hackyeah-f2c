export const nameToPascalCase = (name: string): string => {
  return name
    .replace(/(\w)(\w*)/g, (_, firstLetter, restLetters) => {
      return firstLetter.toUpperCase() + restLetters.toLowerCase()
    })
    .replaceAll(' ', '')
}

export const nameToCamelCase = (name: string): string => {
  const parsedName = name
    .replace(/(\w)(\w*)/g, (_, firstLetter, restLetters) => {
      return firstLetter.toUpperCase() + restLetters.toLowerCase()
    })
    .replaceAll(' ', '')

  return parsedName.charAt(0).toLowerCase() + parsedName.slice(1)
}
