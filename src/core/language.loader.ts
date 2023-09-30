import { AwilixContainer, listModules } from 'awilix'
import { LanguageModuleDetector } from './language.detector'
import { Language } from '../models'
import { asDictionary } from '../utils'

export interface LanguageModuleLoaderDependencies {
  languageModuleDetector: LanguageModuleDetector
}

export class LanguageModuleLoader {
  constructor(private readonly dependencies: LanguageModuleLoaderDependencies) {}

  async loadLanguages(container: AwilixContainer) {
    const { languageModuleDetector } = this.dependencies

    const languages = languageModuleDetector.detectLanguages()
    const languageModulePaths = listModules(
      languages.map((language) => this.getLanguageContainerPath(language))
    )

    const renderers = await Promise.all(
      languageModulePaths.map(async ({ path, name }) => {
        const languageModule = await import(path)
        const containerFactory = languageModule.registerLanguage

        return [name.substring(0, name.length - 10), containerFactory(container)]
      })
    )

    container.register({ renderers: asDictionary(Object.fromEntries(renderers)) })
  }

  private getLanguageContainerPath(language: Language) {
    return `src/languages/${language}/${language}.container.ts`
  }
}
