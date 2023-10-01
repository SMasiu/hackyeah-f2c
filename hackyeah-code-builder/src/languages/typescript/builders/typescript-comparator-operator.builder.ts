import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import { Builder } from '../../../core'
import { TypeScriptComparatorOperator, TypeScriptExpressionType } from '../typescript.types'

export interface TypeScriptComparatorOperatorPayload {
  expressionType: TypeScriptExpressionType.COMPARATOR_OPERATOR
  leftExpression: TypeScriptExpressionPayload
  rightExpression: TypeScriptExpressionPayload
  operator: TypeScriptComparatorOperator
}

export class TypeScriptComparatorOperatorBuilder
  implements Builder<TypeScriptComparatorOperatorPayload>
{
  private leftExpression: TypeScriptExpressionBuilder
  private rightExpression: TypeScriptExpressionBuilder
  private operator: TypeScriptComparatorOperator

  build(): TypeScriptComparatorOperatorPayload {
    const { leftExpression, rightExpression, operator } = this

    return {
      leftExpression: leftExpression.build(),
      rightExpression: rightExpression.build(),
      operator,
      expressionType: TypeScriptExpressionType.COMPARATOR_OPERATOR
    }
  }

  setLeftExpression(
    leftExpression: TypeScriptExpressionBuilder
  ): TypeScriptComparatorOperatorBuilder {
    this.leftExpression = leftExpression

    return this
  }

  setRightExpression(
    rightExpression: TypeScriptExpressionBuilder
  ): TypeScriptComparatorOperatorBuilder {
    this.rightExpression = rightExpression

    return this
  }

  setOperator(operator: TypeScriptComparatorOperator): TypeScriptComparatorOperatorBuilder {
    this.operator = operator

    return this
  }
}

export const typeScriptComparatorOperatorBuilderFactory = () =>
  new TypeScriptComparatorOperatorBuilder()
