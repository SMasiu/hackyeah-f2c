import { AwilixContainer, listModules } from 'awilix'
import { BuilderModuleDetector } from './builder.detector'
import { asArray } from '../utils'

export interface BuilderModuleLoaderDependencies {
  builderModuleDetector: BuilderModuleDetector
}

export class BuilderModuleLoader {
  constructor(private readonly dependencies: BuilderModuleLoaderDependencies) {}

  async loadFeatureBuilders(container: AwilixContainer) {
    const { builderModuleDetector } = this.dependencies

    const featureBuilders = builderModuleDetector.detectFeatureBuilders()
    const featureBuilderModulePaths = listModules(
      featureBuilders.map((featureBuilder) => this.getFeatureBuilderContainerPath(featureBuilder))
    )

    const featureGenerators = await Promise.all(
      featureBuilderModulePaths.map(async (modulePath) => {
        const featureBuilderModule = await import(modulePath.path)
        const containerFactory = featureBuilderModule.registerFeatureBuilder

        return containerFactory(container)
      })
    )

    container.register({ featureGenerators: asArray(featureGenerators) })

    return container
  }

  private getApplicationBuilderContainerPath(applicationBuilderId: string) {
    return `src/applications/${applicationBuilderId}/${applicationBuilderId}.container.ts`
  }

  private getFeatureBuilderContainerPath(featureBuilderId: string) {
    return `src/features/${featureBuilderId}/${featureBuilderId}.container.ts`
  }
}
