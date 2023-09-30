import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptMathOperatorItemType, TypeScriptMathOperatorPayload } from '../builders'
import { TypeScriptMathOperator } from '../typescript.types'

export interface TypeScriptMathOperatorRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptMathOperatorRenderer implements Renderer<TypeScriptMathOperatorPayload> {
  private mathOperatorMap: Record<TypeScriptMathOperator, string> = {
    ADD: '+',
    SUBTRACT: '-',
    DIVIDE: '/',
    MULTIPLY: '*',
    POWER: '**'
  }

  constructor(private readonly dependencies: TypeScriptMathOperatorRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptMathOperatorPayload) {
    const { typeScriptExpressionRenderer } = this.dependencies
    const { items } = payload

    for (const item of items) {
      if (item.type === TypeScriptMathOperatorItemType.OPERATOR) {
        fileContent.appendItemToContentWithSpacing(this.mathOperatorMap[item.operator])
      } else {
        fileContent.addSpacingToNextItem()
        typeScriptExpressionRenderer.render(fileContent, item.expression)
      }
    }
  }
}
