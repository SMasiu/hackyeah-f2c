import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptComparatorOperatorPayload } from '../builders'
import { TypeScriptComparatorOperator } from '../typescript.types'

export interface TypeScriptComparatorOperatorRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptComparatorOperatorRenderer
  implements Renderer<TypeScriptComparatorOperatorPayload>
{
  private comparatorOperatorMap: Record<TypeScriptComparatorOperator, string> = {
    LESS_THAN: '<',
    LESS_OR_EQUAL_THAN: '<=',
    GREATER_THAN: '>',
    GREATER_OR_EQUAL_THAN: '>=',
    EQUALS: '==',
    NOT_EQUALS: '!=',
    STRONG_EQUALS: '===',
    STRONG_NOT_EQUALS: '!=='
  }

  constructor(private readonly dependencies: TypeScriptComparatorOperatorRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptComparatorOperatorPayload) {
    const { typeScriptExpressionRenderer } = this.dependencies
    const { leftExpression, operator, rightExpression } = payload

    typeScriptExpressionRenderer.render(fileContent, leftExpression)

    fileContent.appendItemToContentWithSpacing(this.comparatorOperatorMap[operator])
    fileContent.addSpacingToNextItem()

    typeScriptExpressionRenderer.render(fileContent, rightExpression)
  }
}
