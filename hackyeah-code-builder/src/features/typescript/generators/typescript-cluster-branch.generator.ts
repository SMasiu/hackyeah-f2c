import { ApplicationClusterContent, getApiModuleFromClusterNode } from '../../../core'
import { TypeScriptFunctionalityBuilder } from '../../../languages/typescript'
import { ClusterNodeFunctionalityDto } from '../../../models'
import { TypeScriptApis } from '../apis/typescript.api'

export interface TypeScriptClusterBranchGeneratorDependencies {
  typescriptApis: TypeScriptApis
}

export class TypeScriptClusterBranchGenerator {
  constructor(private readonly dependencies: TypeScriptClusterBranchGeneratorDependencies) {}

  generateBranch(
    branch: Generator<ClusterNodeFunctionalityDto>,
    clusterContent: ApplicationClusterContent
  ) {
    const { typescriptApis } = this.dependencies
    const functionalityBuilder = new TypeScriptFunctionalityBuilder()

    for (const node of branch) {
      const apiModule = getApiModuleFromClusterNode(node)
      const api = typescriptApis[apiModule]

      api.generateFlow({ node, builder: functionalityBuilder, clusterContent })
    }

    return functionalityBuilder
  }
}
