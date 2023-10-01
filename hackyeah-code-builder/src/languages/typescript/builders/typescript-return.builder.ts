import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import { Builder } from '../../../core'
import { TypeScriptStatementType } from '../typescript.types'

export interface TypeScriptReturnPayload {
  statementType: TypeScriptStatementType.RETURN
  expression?: TypeScriptExpressionPayload
}

export class TypeScriptReturnBuilder implements Builder<TypeScriptReturnPayload> {
  private expression: TypeScriptExpressionBuilder

  build(): TypeScriptReturnPayload {
    const { expression } = this

    return { statementType: TypeScriptStatementType.RETURN, expression: expression?.build() }
  }

  setExpression(expression: TypeScriptExpressionBuilder): TypeScriptReturnBuilder {
    this.expression = expression

    return this
  }
}

export const typeScriptReturnBuilderFactory = () => new TypeScriptReturnBuilder()
