import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptReturnPayload } from '../builders'

export interface TypeScriptReturnRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptReturnRenderer implements Renderer<TypeScriptReturnPayload> {
  constructor(private readonly dependencies: TypeScriptReturnRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptReturnPayload) {
    const { typeScriptExpressionRenderer } = this.dependencies
    const { expression } = payload

    fileContent.appendItemToContent('return')
    fileContent.addSpacingToNextItem()

    if (expression) {
      typeScriptExpressionRenderer.render(fileContent, expression)
    }
  }
}
