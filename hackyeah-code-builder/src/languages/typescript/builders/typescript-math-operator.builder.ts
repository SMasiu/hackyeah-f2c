import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import { Builder } from '../../../core'
import { TypeScriptExpressionType, TypeScriptMathOperator } from '../typescript.types'

export enum TypeScriptMathOperatorItemType {
  OPERATOR = 'OPERATOR',
  EXPRESSION = 'EXPRESSION'
}

export type TypeScriptMathOperatorItemPayload =
  | {
      type: TypeScriptMathOperatorItemType.OPERATOR
      operator: TypeScriptMathOperator
    }
  | {
      type: TypeScriptMathOperatorItemType.EXPRESSION
      expression: TypeScriptExpressionPayload
    }

export type TypeScriptMathOperatorItem =
  | {
      type: TypeScriptMathOperatorItemType.OPERATOR
      operator: TypeScriptMathOperator
    }
  | {
      type: TypeScriptMathOperatorItemType.EXPRESSION
      expression: TypeScriptExpressionBuilder
    }

export interface TypeScriptMathOperatorPayload {
  expressionType: TypeScriptExpressionType.MATH_OPERATOR
  items: TypeScriptMathOperatorItemPayload[]
}

export class TypeScriptMathOperatorBuilder implements Builder<TypeScriptMathOperatorPayload> {
  private items: TypeScriptMathOperatorItem[] = []

  build(): TypeScriptMathOperatorPayload {
    const { items } = this

    return {
      expressionType: TypeScriptExpressionType.MATH_OPERATOR,
      items: items.map((item) => {
        if (item.type === TypeScriptMathOperatorItemType.OPERATOR) return item

        return {
          ...item,
          expression: item.expression.build()
        }
      })
    }
  }

  addItem(item: TypeScriptMathOperatorItem): TypeScriptMathOperatorBuilder {
    this.items.push(item)

    return this
  }

  addItems(items: TypeScriptMathOperatorItem[]): TypeScriptMathOperatorBuilder {
    this.items.push(...items)

    return this
  }

  addExpression(expression: TypeScriptExpressionBuilder): TypeScriptMathOperatorBuilder {
    this.items.push({
      type: TypeScriptMathOperatorItemType.EXPRESSION,
      expression
    })

    return this
  }

  addOperator(operator: TypeScriptMathOperator): TypeScriptMathOperatorBuilder {
    this.items.push({
      type: TypeScriptMathOperatorItemType.OPERATOR,
      operator
    })

    return this
  }
}

export const typeScriptMathOperatorBuilderFactory = () => new TypeScriptMathOperatorBuilder()
