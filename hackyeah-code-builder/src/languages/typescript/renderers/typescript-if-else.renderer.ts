import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { TypeScriptFunctionalityRenderer } from './typescript-functionality.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptIfElsePayload } from '../builders'

export interface TypeScriptIfElseRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
  typeScriptFunctionalityRenderer: TypeScriptFunctionalityRenderer
}

export class TypeScriptIfElseRenderer implements Renderer<TypeScriptIfElsePayload> {
  constructor(private readonly dependencies: TypeScriptIfElseRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptIfElsePayload) {
    const { typeScriptExpressionRenderer, typeScriptFunctionalityRenderer } = this.dependencies
    const { paths, fallback } = payload

    const [ifStatement, ...elseIfStatements] = paths

    fileContent.appendItemToContent('if')
    fileContent.appendItemToContentWithSpacing('(')
    typeScriptExpressionRenderer.render(fileContent, ifStatement.expression)
    fileContent.appendItemToContent(')')

    fileContent.appendItemToContentWithSpacing('{')
    fileContent.pushIndentation()
    fileContent.startNewContent()

    typeScriptFunctionalityRenderer.render(fileContent, ifStatement.functionality)

    fileContent.popIndentation()
    fileContent.startNewContent()
    fileContent.appendItemToContent('}')

    if (elseIfStatements) {
      for (const ifElseStatement of elseIfStatements) {
        fileContent.appendItemToContentWithSpacing('else')
        fileContent.appendItemToContentWithSpacing('if')

        fileContent.appendItemToContentWithSpacing('(')
        typeScriptExpressionRenderer.render(fileContent, ifElseStatement.expression)
        fileContent.appendItemToContent(')')

        fileContent.appendItemToContentWithSpacing('{')
        fileContent.pushIndentation()
        fileContent.startNewContent()

        typeScriptFunctionalityRenderer.render(fileContent, ifElseStatement.functionality)

        fileContent.popIndentation()
        fileContent.startNewContent()
        fileContent.appendItemToContent('}')
      }
    }

    if (fallback) {
      fileContent.appendItemToContentWithSpacing('else')
      fileContent.appendItemToContentWithSpacing('{')
      fileContent.pushIndentation()
      fileContent.startNewContent()

      typeScriptFunctionalityRenderer.render(fileContent, fallback)

      fileContent.popIndentation()
      fileContent.startNewContent()
      fileContent.appendItemToContent('}')
    }
  }
}
