import { Api } from '../../../apis/api'
import { ApplicationClusterContent } from '../../../core'
import { TypeScriptFunctionalityBuilder } from '../../../languages/typescript'
import { ClusterNodeFunctionalityDto } from '../../../models'

export interface TypeScriptApiState {
  node: ClusterNodeFunctionalityDto
  builder: TypeScriptFunctionalityBuilder
  clusterContent: ApplicationClusterContent
}

export type TypeScriptApis = Record<string, Api<TypeScriptApiState>>
