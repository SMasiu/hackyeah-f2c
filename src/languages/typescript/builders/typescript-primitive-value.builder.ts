import { Builder } from '../../../core'
import { TypeScriptExpressionType, TypeScriptPrimitiveType } from '../typescript.types'

export interface TypeScriptPrimitiveValuePayload {
  expressionType: TypeScriptExpressionType.PRIMITIVE_VALUE
  type: TypeScriptPrimitiveType
  value: string
}

export class TypeScriptPrimitiveValueBuilder implements Builder<TypeScriptPrimitiveValuePayload> {
  private type: TypeScriptPrimitiveType
  private value: string

  build(): TypeScriptPrimitiveValuePayload {
    const { type, value } = this

    return { expressionType: TypeScriptExpressionType.PRIMITIVE_VALUE, type, value }
  }

  setType(type: TypeScriptPrimitiveType): TypeScriptPrimitiveValueBuilder {
    this.type = type

    return this
  }

  setValue(value: string): TypeScriptPrimitiveValueBuilder {
    this.value = value

    return this
  }

  setStringValue(value: string): TypeScriptPrimitiveValueBuilder {
    this.value = value
    this.type = TypeScriptPrimitiveType.STRING

    return this
  }

  setNumberValue(value: number): TypeScriptPrimitiveValueBuilder {
    this.value = value.toString()
    this.type = TypeScriptPrimitiveType.NUMBER

    return this
  }

  setBooleanValue(value: boolean): TypeScriptPrimitiveValueBuilder {
    this.value = value.toString()
    this.type = TypeScriptPrimitiveType.BOOLEAN

    return this
  }

  setUndefinedValue(): TypeScriptPrimitiveValueBuilder {
    this.type = TypeScriptPrimitiveType.UNDEFINED

    return this
  }

  setNullValue(): TypeScriptPrimitiveValueBuilder {
    this.type = TypeScriptPrimitiveType.NULL

    return this
  }
}

export const typeScriptPrimitiveValueBuilderFactory = () => new TypeScriptPrimitiveValueBuilder()
