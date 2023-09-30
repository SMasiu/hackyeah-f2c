import { ApplicationStore } from './core'
import { ClusterDto, DataTypeDto } from './models'
import { staticApplication } from '../fixtures/application.static'
import { staticDataTypes } from '../fixtures/data-type.static'

export const loadFixtureData = (cluster: ClusterDto) => {
  const dataTypes: DataTypeDto[] = [...staticDataTypes]
  const clusters: ClusterDto[] = [cluster]

  const applicationStore = new ApplicationStore()

  return applicationStore.load({
    ...staticApplication,
    dataTypes,
    clusters
  })
}
