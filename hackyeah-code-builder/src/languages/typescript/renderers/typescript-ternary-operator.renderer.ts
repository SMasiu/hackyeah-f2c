import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypescriptTernaryOperatorPayload } from '../builders'

export interface TypescriptTernaryOperatorRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypescriptTernaryOperatorRenderer
  implements Renderer<TypescriptTernaryOperatorPayload>
{
  constructor(private readonly dependencies: TypescriptTernaryOperatorRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypescriptTernaryOperatorPayload) {
    const { typeScriptExpressionRenderer } = this.dependencies
    const { expression, trueExpression, falseExpression } = payload

    typeScriptExpressionRenderer.render(fileContent, expression)

    fileContent.appendItemToContentWithSpacing('?')
    fileContent.addSpacingToNextItem()

    typeScriptExpressionRenderer.render(fileContent, trueExpression)

    fileContent.appendItemToContentWithSpacing(':')
    fileContent.addSpacingToNextItem()

    typeScriptExpressionRenderer.render(fileContent, falseExpression)
  }
}
