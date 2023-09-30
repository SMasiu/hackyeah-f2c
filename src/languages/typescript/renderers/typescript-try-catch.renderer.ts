import { TypeScriptArgumentDeclarationRenderer } from './typescript-argument-declaration.renderer'
import { TypeScriptFunctionalityRenderer } from './typescript-functionality.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptTryCatchPayload } from '../builders'

export interface TypeScriptTryCatchRendererDependencies {
  typeScriptFunctionalityRenderer: TypeScriptFunctionalityRenderer
  typeScriptArgumentDeclarationRenderer: TypeScriptArgumentDeclarationRenderer
}

export class TypeScriptTryCatchRenderer implements Renderer<TypeScriptTryCatchPayload> {
  constructor(private readonly dependencies: TypeScriptTryCatchRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptTryCatchPayload) {
    const { typeScriptFunctionalityRenderer, typeScriptArgumentDeclarationRenderer } =
      this.dependencies
    const { tryFunctionality, catchFunctionality, catchArg, finallyFunctionality } = payload

    fileContent.appendItemToContent('try')

    fileContent.appendItemToContentWithSpacing('{')
    fileContent.pushIndentation()
    fileContent.startNewContent()

    typeScriptFunctionalityRenderer.render(fileContent, tryFunctionality)

    fileContent.popIndentation()
    fileContent.startNewContent()
    fileContent.appendItemToContent('}')

    fileContent.appendItemToContentWithSpacing('catch')

    if (catchArg) {
      fileContent.appendItemToContentWithSpacing('(')
      typeScriptArgumentDeclarationRenderer.render(fileContent, catchArg)
      fileContent.appendItemToContent(')')
    }

    fileContent.appendItemToContentWithSpacing('{')
    fileContent.pushIndentation()
    fileContent.startNewContent()

    typeScriptFunctionalityRenderer.render(fileContent, catchFunctionality)

    fileContent.popIndentation()
    fileContent.startNewContent()
    fileContent.appendItemToContent('}')

    if (finallyFunctionality) {
      fileContent.appendItemToContentWithSpacing('finally')

      fileContent.appendItemToContentWithSpacing('{')
      fileContent.pushIndentation()
      fileContent.startNewContent()

      typeScriptFunctionalityRenderer.render(fileContent, finallyFunctionality)

      fileContent.popIndentation()
      fileContent.startNewContent()
      fileContent.appendItemToContent('}')
    }
  }
}
