import { TypeScriptExpressionRenderer } from './typescript-expression.renderer'
import { ApplicationFileContent, Renderer } from '../../../core'
import { TypeScriptLogicalOperatorItemType, TypeScriptLogicalOperatorPayload } from '../builders'
import { TypeScriptLogicalOperator } from '../typescript.types'

export interface TypeScriptLogicalOperatorRendererDependencies {
  typeScriptExpressionRenderer: TypeScriptExpressionRenderer
}

export class TypeScriptLogicalOperatorRenderer
  implements Renderer<TypeScriptLogicalOperatorPayload>
{
  private logicalOperatorMap: Record<TypeScriptLogicalOperator, string> = {
    OR: '||',
    AND: '&&',
    NULLISH_COALESCING: '??'
  }

  constructor(private readonly dependencies: TypeScriptLogicalOperatorRendererDependencies) {}

  render(fileContent: ApplicationFileContent, payload: TypeScriptLogicalOperatorPayload) {
    const { typeScriptExpressionRenderer } = this.dependencies
    const { items } = payload

    const lastItemIndex = items.length - 1

    for (const [index, item] of items.entries()) {
      if (item.type === TypeScriptLogicalOperatorItemType.OPERATOR) {
        fileContent.appendItemToContent(this.logicalOperatorMap[item.operator])
      } else {
        typeScriptExpressionRenderer.render(fileContent, item.expression)
      }

      if (lastItemIndex !== index) {
        fileContent.addSpacingToNextItem()
      }
    }
  }
}
