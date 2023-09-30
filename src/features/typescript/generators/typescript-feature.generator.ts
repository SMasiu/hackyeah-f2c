import { TypeScriptClusterGenerator } from './typescript-cluster.generator'
import {
  ApplicationContext,
  ApplicationFileType,
  ApplicationStore,
  FeatureGenerator
} from '../../../core'
import { TypescriptApplicationFile } from '../../../languages/typescript'

export interface TypeScriptClusterGeneratorDependencies {
  store: ApplicationStore
  context: ApplicationContext
  typeScriptClusterGenerator: TypeScriptClusterGenerator
}

export class TypeScriptFeatureGenerator implements FeatureGenerator {
  constructor(private readonly dependencies: TypeScriptClusterGeneratorDependencies) {}

  generate() {
    const { store, context, typeScriptClusterGenerator } = this.dependencies
    const { clusters } = store

    for (const cluster of clusters) {
      const file = new TypescriptApplicationFile({
        id: cluster.id,
        fileName: `${cluster.id}.ts`,
        dirName: '',
        type: ApplicationFileType.FUNCTIONALITY
      })

      typeScriptClusterGenerator.generateFunctionality(file.builder, cluster)

      context.addFile(file)
    }
  }
}
