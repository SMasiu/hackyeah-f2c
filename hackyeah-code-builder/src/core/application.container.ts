import { asClass, AwilixContainer } from 'awilix'
import { ApplicationContext } from './application.context'
import { BuilderModuleDetector } from './builder.detector'
import { BuilderModuleLoader } from './builder.loader'
import { LanguageModuleDetector } from './language.detector'
import { LanguageModuleLoader } from './language.loader'

export const registerApplicationDependencies = (container: AwilixContainer) => {
  container.register({
    context: asClass(ApplicationContext).singleton(),
    builderModuleDetector: asClass(BuilderModuleDetector).singleton(),
    builderModuleLoader: asClass(BuilderModuleLoader).singleton(),
    languageModuleDetector: asClass(LanguageModuleDetector).singleton(),
    languageModuleLoader: asClass(LanguageModuleLoader).singleton()
  })

  return container
}
