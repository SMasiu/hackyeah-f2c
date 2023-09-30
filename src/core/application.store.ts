import { ClusterDto, DataTypeDto, SelectedFeatureBuilderDto } from '../models'
import { throwError } from '../utils'

export class ApplicationStore {
  readonly featureBuilders: SelectedFeatureBuilderDto[]
  readonly dataTypes: DataTypeDto[]
  readonly clusters: ClusterDto[]

  load(
    model: Pick<ApplicationStore, 'featureBuilders' | 'dataTypes' | 'clusters'>
  ): ApplicationStore {
    Object.assign(this, model)
    return this
  }

  getDataTypeById(dataTypeId: string): DataTypeDto {
    return (
      this.dataTypes.find((dataType) => dataType.id === dataTypeId) ||
      throwError(`Data type with id [${dataTypeId}] not found`)
    )
  }
}
