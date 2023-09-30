import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import { Builder } from '../../../core'
import { TypeScriptExpressionType, TypeScriptLogicalOperator } from '../typescript.types'

export enum TypeScriptLogicalOperatorItemType {
  OPERATOR = 'OPERATOR',
  EXPRESSION = 'EXPRESSION'
}

export type TypeScriptLogicalOperatorItemPayload =
  | {
      type: TypeScriptLogicalOperatorItemType.OPERATOR
      operator: TypeScriptLogicalOperator
    }
  | {
      type: TypeScriptLogicalOperatorItemType.EXPRESSION
      expression: TypeScriptExpressionPayload
    }

export type TypeScriptLogicalOperatorItem =
  | {
      type: TypeScriptLogicalOperatorItemType.OPERATOR
      operator: TypeScriptLogicalOperator
    }
  | {
      type: TypeScriptLogicalOperatorItemType.EXPRESSION
      expression: TypeScriptExpressionBuilder
    }

export interface TypeScriptLogicalOperatorPayload {
  expressionType: TypeScriptExpressionType.LOGICAL_OPERATOR
  items: TypeScriptLogicalOperatorItemPayload[]
}

export class TypeScriptLogicalOperatorBuilder implements Builder<TypeScriptLogicalOperatorPayload> {
  items: TypeScriptLogicalOperatorItem[] = []

  build(): TypeScriptLogicalOperatorPayload {
    const { items } = this

    return {
      expressionType: TypeScriptExpressionType.LOGICAL_OPERATOR,
      items: items.map((item) => {
        if (item.type === TypeScriptLogicalOperatorItemType.OPERATOR) return item

        return {
          ...item,
          expression: item.expression.build()
        }
      })
    }
  }

  addItem(item: TypeScriptLogicalOperatorItem): TypeScriptLogicalOperatorBuilder {
    this.items.push(item)

    return this
  }

  addItems(items: TypeScriptLogicalOperatorItem[]): TypeScriptLogicalOperatorBuilder {
    this.items.push(...items)

    return this
  }

  addExpression(expression: TypeScriptExpressionBuilder): TypeScriptLogicalOperatorBuilder {
    this.items.push({
      type: TypeScriptLogicalOperatorItemType.EXPRESSION,
      expression
    })

    return this
  }

  addOperator(operator: TypeScriptLogicalOperator): TypeScriptLogicalOperatorBuilder {
    this.items.push({
      type: TypeScriptLogicalOperatorItemType.OPERATOR,
      operator
    })

    return this
  }
}

export const typeScriptLogicalOperatorBuilderFactory = () => new TypeScriptLogicalOperatorBuilder()
