import { ApplicationStore } from './application.store'
import { Language } from '../models'
import { distinctArray } from '../utils/array.utils'

export interface LanguageModuleDetectorDependencies {
  store: ApplicationStore
}

export class LanguageModuleDetector {
  constructor(private readonly dependencies: LanguageModuleDetectorDependencies) {}

  detectLanguages(): Language[] {
    const { featureBuilders } = this.dependencies.store

    return distinctArray([...featureBuilders.flatMap((featureBuilder) => featureBuilder.languages)])
  }
}
