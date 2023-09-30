import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import { Builder } from '../../../core'
import { TypeScriptStatementType } from '../typescript.types'

export interface TypeScriptThrowPayload {
  statementType: TypeScriptStatementType.THROW
  expression: TypeScriptExpressionPayload
}

export class TypeScriptThrowBuilder implements Builder<TypeScriptThrowPayload> {
  private expression: TypeScriptExpressionBuilder

  build(): TypeScriptThrowPayload {
    const { expression } = this

    return {
      statementType: TypeScriptStatementType.THROW,
      expression: expression.build()
    }
  }

  setExpression(expression: TypeScriptExpressionBuilder): TypeScriptThrowBuilder {
    this.expression = expression

    return this
  }
}

export const typeScriptThrowBuilderFactory = () => new TypeScriptThrowBuilder()
