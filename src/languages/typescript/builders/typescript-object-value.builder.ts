import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import { Builder } from '../../../core'
import { TypeScriptExpressionType } from '../typescript.types'

export enum TypeScriptObjectValueType {
  KEY = 'KEY',
  EXPRESSION = 'EXPRESSION'
}

export type TypeScriptObjectValueUnionItem<TType, TData> = TData & {
  type: TType
}

export interface TypeScriptObjectValueKeyPayload {
  key: string | TypeScriptExpressionPayload
  value: TypeScriptExpressionPayload
}
export interface TypeScriptObjectValueKey {
  key: string | TypeScriptExpressionBuilder
  value: TypeScriptExpressionBuilder
}

export interface TypeScriptObjectValueExpressionPayload {
  expression: TypeScriptExpressionPayload
}

export interface TypeScriptObjectValueExpression {
  expression: TypeScriptExpressionBuilder
}

export type TypeScriptObjectValueItem =
  | TypeScriptObjectValueUnionItem<TypeScriptObjectValueType.KEY, TypeScriptObjectValueKey>
  | TypeScriptObjectValueUnionItem<
      TypeScriptObjectValueType.EXPRESSION,
      TypeScriptObjectValueExpression
    >

export type TypeScriptObjectValueItemPayload =
  | TypeScriptObjectValueUnionItem<TypeScriptObjectValueType.KEY, TypeScriptObjectValueKeyPayload>
  | TypeScriptObjectValueUnionItem<
      TypeScriptObjectValueType.EXPRESSION,
      TypeScriptObjectValueExpressionPayload
    >

export interface TypeScriptObjectValuePayload {
  expressionType: TypeScriptExpressionType.OBJECT_VALUE
  values: TypeScriptObjectValueItemPayload[]
}

export class TypeScriptObjectValueBuilder implements Builder<TypeScriptObjectValuePayload> {
  private values: TypeScriptObjectValueItem[] = []

  build(): TypeScriptObjectValuePayload {
    const { values } = this

    return {
      expressionType: TypeScriptExpressionType.OBJECT_VALUE,
      values: values.map((value) => {
        switch (value.type) {
          case TypeScriptObjectValueType.KEY: {
            return {
              ...value,
              key: typeof value.key === 'string' ? value.key : value.key.build(),
              value: value.value.build()
            }
          }
          case TypeScriptObjectValueType.EXPRESSION: {
            return {
              ...value,
              expression: value.expression.build()
            }
          }
        }
      })
    }
  }

  addKeyValue(value: TypeScriptObjectValueKey): TypeScriptObjectValueBuilder {
    this.values.push({ ...value, type: TypeScriptObjectValueType.KEY })

    return this
  }

  addKeyValues(values: TypeScriptObjectValueKey[]): TypeScriptObjectValueBuilder {
    this.values.push(
      ...values.map(
        (value): TypeScriptObjectValueItem => ({ ...value, type: TypeScriptObjectValueType.KEY })
      )
    )

    return this
  }

  addExpressionValue(value: TypeScriptObjectValueExpression): TypeScriptObjectValueBuilder {
    this.values.push({ ...value, type: TypeScriptObjectValueType.EXPRESSION })

    return this
  }

  addExpressionValues(values: TypeScriptObjectValueExpression[]): TypeScriptObjectValueBuilder {
    this.values.push(
      ...values.map(
        (value): TypeScriptObjectValueItem => ({
          ...value,
          type: TypeScriptObjectValueType.EXPRESSION
        })
      )
    )

    return this
  }
}

export const typeScriptObjectValueBuilderFactory = () => new TypeScriptObjectValueBuilder()
