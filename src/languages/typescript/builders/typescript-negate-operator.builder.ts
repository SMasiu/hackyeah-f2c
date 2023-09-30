import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import { Builder } from '../../../core'
import { TypeScriptExpressionType } from '../typescript.types'

export interface TypeScriptNegateOperatorPayload {
  value: TypeScriptExpressionPayload
  expressionType: TypeScriptExpressionType.NEGATE_OPERATOR
}

export class TypeScriptNegateOperatorBuilder implements Builder<TypeScriptNegateOperatorPayload> {
  private value: TypeScriptExpressionBuilder

  build(): TypeScriptNegateOperatorPayload {
    const { value } = this

    return { expressionType: TypeScriptExpressionType.NEGATE_OPERATOR, value: value.build() }
  }

  setValue(value: TypeScriptExpressionBuilder): TypeScriptNegateOperatorBuilder {
    this.value = value

    return this
  }
}

export const typeScriptNegateOperatorBuilderFactory = () => new TypeScriptNegateOperatorBuilder()
