import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { TypeScriptFunctionalityRenderer } from './typescript-functionality.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptWhileLoopPayload } from '../builders'

export interface TypeScriptWhileLoopRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
  typeScriptFunctionalityRenderer: TypeScriptFunctionalityRenderer
}

export class TypeScriptWhileLoopRenderer implements Renderer<TypeScriptWhileLoopPayload> {
  constructor(private readonly dependencies: TypeScriptWhileLoopRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptWhileLoopPayload) {
    const { typeScriptExpressionRenderer, typeScriptFunctionalityRenderer } = this.dependencies
    const { expression, functionality } = payload

    fileContent.appendItemToContent('while')
    fileContent.appendItemToContentWithSpacing('(')
    typeScriptExpressionRenderer.render(fileContent, expression)
    fileContent.appendItemToContent(')')

    fileContent.appendItemToContentWithSpacing('{')
    fileContent.pushIndentation()
    fileContent.startNewContent()

    typeScriptFunctionalityRenderer.render(fileContent, functionality)

    fileContent.popIndentation()
    fileContent.startNewContent()
    fileContent.appendItemToContent('}')
  }
}
