import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import { Builder } from '../../../core'
import { TypeScriptExpressionType } from '../typescript.types'

export interface TypeScriptExpressionGroupPayload {
  expressionType: TypeScriptExpressionType.EXPRESSION_GROUP
  expression: TypeScriptExpressionPayload
}

export class TypeScriptExpressionGroupBuilder implements Builder<TypeScriptExpressionGroupPayload> {
  private expression: TypeScriptExpressionBuilder

  build(): TypeScriptExpressionGroupPayload {
    const { expression } = this

    return {
      expressionType: TypeScriptExpressionType.EXPRESSION_GROUP,
      expression: expression.build()
    }
  }

  setExpression(expression: TypeScriptExpressionBuilder): TypeScriptExpressionGroupBuilder {
    this.expression = expression

    return this
  }
}

export const typeScriptExpressionGroupBuilderFactory = () => new TypeScriptExpressionGroupBuilder()
