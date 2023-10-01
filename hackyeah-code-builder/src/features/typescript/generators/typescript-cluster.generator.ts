import { TypeScriptClusterBranchGenerator } from './typescript-cluster-branch.generator'
import { ApplicationClusterContent } from '../../../core'
import { TypeScriptBuilder } from '../../../languages/typescript'
import { ClusterDto } from '../../../models'

export interface TypeScriptClusterGeneratorDependencies {
  typeScriptClusterBranchGenerator: TypeScriptClusterBranchGenerator
}

export class TypeScriptClusterGenerator {
  constructor(private readonly dependencies: TypeScriptClusterGeneratorDependencies) {}

  generateFunctionality(schemaBuilder: TypeScriptBuilder, cluster: ClusterDto) {
    const { typeScriptClusterBranchGenerator } = this.dependencies

    const clusterContent = new ApplicationClusterContent(cluster)
    const functionalityBuilder = typeScriptClusterBranchGenerator.generateBranch(
      clusterContent.getRootBranch(),
      clusterContent
    )

    schemaBuilder.setFunctionality(functionalityBuilder)
  }
}
