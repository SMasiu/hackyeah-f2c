import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { TypeScriptFunctionalityRenderer } from './typescript-functionality.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptDoWhileLoopPayload } from '../builders'

export interface TypeScriptDoWhileLoopRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
  typeScriptFunctionalityRenderer: TypeScriptFunctionalityRenderer
}

export class TypeScriptDoWhileLoopRenderer implements Renderer<TypeScriptDoWhileLoopPayload> {
  constructor(private readonly dependencies: TypeScriptDoWhileLoopRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptDoWhileLoopPayload) {
    const { typeScriptExpressionRenderer, typeScriptFunctionalityRenderer } = this.dependencies
    const { expression, functionality } = payload

    fileContent.appendItemToContent('do')
    fileContent.appendItemToContentWithSpacing('{')

    fileContent.pushIndentation()
    fileContent.startNewContent()

    typeScriptFunctionalityRenderer.render(fileContent, functionality)

    fileContent.popIndentation()
    fileContent.startNewContent()

    fileContent.appendItemToContent('}')
    fileContent.appendItemToContentWithSpacing('while')
    fileContent.appendItemToContentWithSpacing('(')

    typeScriptExpressionRenderer.render(fileContent, expression)

    fileContent.appendItemToContent(')')
  }
}
