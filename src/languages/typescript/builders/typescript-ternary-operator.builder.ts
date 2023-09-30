import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import { Builder } from '../../../core'
import { TypeScriptExpressionType, TypeScriptStatementType } from '../typescript.types'

export interface TypescriptTernaryOperatorPayload {
  statementType: TypeScriptStatementType.TERNARY_OPERATOR
  expressionType: TypeScriptExpressionType.TERNARY_OPERATOR
  expression: TypeScriptExpressionPayload
  trueExpression: TypeScriptExpressionPayload
  falseExpression: TypeScriptExpressionPayload
}

export class TypescriptTernaryOperatorBuilder implements Builder<TypescriptTernaryOperatorPayload> {
  private expression: TypeScriptExpressionBuilder
  private trueExpression: TypeScriptExpressionBuilder
  private falseExpression: TypeScriptExpressionBuilder

  build(): TypescriptTernaryOperatorPayload {
    const { expression, trueExpression, falseExpression } = this

    return {
      statementType: TypeScriptStatementType.TERNARY_OPERATOR,
      expressionType: TypeScriptExpressionType.TERNARY_OPERATOR,
      expression: expression.build(),
      trueExpression: trueExpression.build(),
      falseExpression: falseExpression.build()
    }
  }

  setExpression(expression: TypeScriptExpressionBuilder): TypescriptTernaryOperatorBuilder {
    this.expression = expression

    return this
  }

  setTrueExpression(trueExpression: TypeScriptExpressionBuilder): TypescriptTernaryOperatorBuilder {
    this.trueExpression = trueExpression

    return this
  }

  setFalseExpression(
    falseExpression: TypeScriptExpressionBuilder
  ): TypescriptTernaryOperatorBuilder {
    this.falseExpression = falseExpression

    return this
  }
}

export const typescriptTernaryOperatorBuilderFactory = () => new TypescriptTernaryOperatorBuilder()
