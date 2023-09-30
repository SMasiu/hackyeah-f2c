import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import { Builder } from '../../../core'
import { TypeScriptExpressionType } from '../typescript.types'

export interface TypeScriptArrayValuePayload {
  expressionType: TypeScriptExpressionType.ARRAY_VALUE
  values: TypeScriptExpressionPayload[]
}

export class TypeScriptArrayValueBuilder implements Builder<TypeScriptArrayValuePayload> {
  private values: TypeScriptExpressionBuilder[] = []

  build(): TypeScriptArrayValuePayload {
    const { values } = this

    return {
      expressionType: TypeScriptExpressionType.ARRAY_VALUE,
      values: values.map((value) => value.build())
    }
  }

  addValue(value: TypeScriptExpressionBuilder): TypeScriptArrayValueBuilder {
    this.values.push(value)

    return this
  }

  addValues(values: TypeScriptExpressionBuilder[]): TypeScriptArrayValueBuilder {
    this.values.push(...values)

    return this
  }
}

export const typeScriptArrayValueBuilderFactory = () => new TypeScriptArrayValueBuilder()
