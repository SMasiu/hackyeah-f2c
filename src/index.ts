import { asValue, createContainer, InjectionMode } from 'awilix'
import {
  BuilderModuleLoader,
  registerApplicationDependencies,
  LanguageModuleLoader,
  ApplicationContext,
  ApplicationFileContent
} from './core'
import { loadFixtureData } from './fixture.loader'
import { TypeScriptRenderer } from './languages/typescript/renderers'
import { TypeScriptPayload } from './languages/typescript'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'

hljs.registerLanguage('typescript', typescript)

const main = async () => {
  const app = express()

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(
    cors({
      origin: 'http://localhost:5173'
    })
  )

  app.post('/generate', async (req, res) => {
    try {
      const container = createContainer({
        injectionMode: InjectionMode.PROXY
      }).register({
        store: asValue(loadFixtureData(req.body))
      })
      registerApplicationDependencies(container)

      const builderModuleLoader: BuilderModuleLoader = container.resolve('builderModuleLoader')
      const languageModuleLoader: LanguageModuleLoader = container.resolve('languageModuleLoader')

      await builderModuleLoader.loadFeatureBuilders(container)
      await languageModuleLoader.loadLanguages(container)

      const [typescriptFeatureGenerator] = container.resolve('featureGenerators')
      const context: ApplicationContext = container.resolve('context')
      const typescriptRenderer: TypeScriptRenderer = container.resolve('typeScriptRenderer')

      await typescriptFeatureGenerator.generate()
      const [file] = context.getFiles()

      const builder = file.getBuilder()
      const fileContent = new ApplicationFileContent()

      typescriptRenderer.render(fileContent, builder.build() as TypeScriptPayload)
      const content = hljs.highlight(fileContent.render(), {
        language: 'typescript'
      }).value

      return res.json({ content })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: 'Error'
      })
    }
  })

  app.listen(3000, () => {
    console.log('Server is running')
  })
}

main()
