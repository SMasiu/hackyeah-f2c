import { AwilixContainer, Resolver } from 'awilix'

export const asArray = <T>(resolvers: Resolver<T>[]): Resolver<T[]> => {
  return {
    resolve: (container: AwilixContainer) => resolvers.map((r: Resolver<T>) => container.build(r))
  }
}

export const asDictionary = <T>(dictionary: Record<string, Resolver<T>>) => {
  return {
    resolve: (container: AwilixContainer) => {
      const newDictionary: Record<string, T> = {}

      Object.entries(dictionary).forEach(([key, value]) => {
        newDictionary[key] = container.build(value)
      })

      return newDictionary
    }
  }
}
