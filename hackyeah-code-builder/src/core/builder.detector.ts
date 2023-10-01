import { ApplicationStore } from './application.store'
import { distinctArray } from '../utils/array.utils'

export interface BuilderModuleDetectorDependencies {
  store: ApplicationStore
}

export class BuilderModuleDetector {
  constructor(private readonly dependencies: BuilderModuleDetectorDependencies) {}

  detectFeatureBuilders(): string[] {
    const { featureBuilders } = this.dependencies.store

    return distinctArray(featureBuilders.map((featureBuilder) => featureBuilder.featureBuilderId))
  }
}
