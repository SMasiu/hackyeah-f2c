import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import {
  TypeScriptGenericDeclarationBuilder,
  TypeScriptGenericDeclarationPayload
} from './typescript-generic-declaration.builder'
import { Builder } from '../../../core'
import { TypeScriptExpressionType, TypeScriptStatementType } from '../typescript.types'

export enum TypeScriptReferenceStackType {
  VALUE = 'VALUE',
  INDEX = 'INDEX',
  PROPERTY_INDEX = 'PROPERTY_INDEX',
  CALL = 'CALL',
  PROPERTY_CALL = 'PROPERTY_CALL',
  EXPRESSION = 'EXPRESSION'
}

export type TypeScriptReferenceStackUnionItem<TReferenceStackType, TData> = TData & {
  type: TReferenceStackType
}

export interface TypeScriptReferenceStackValuePayload {
  name: string
  optionalChaining?: boolean
}

export type TypeScriptReferenceStackValue = TypeScriptReferenceStackValuePayload

export interface TypeScriptReferenceStackIndexPayload {
  index: TypeScriptExpressionPayload
  optionalChaining?: boolean
}

export type TypeScriptReferenceStackIndex = Omit<TypeScriptReferenceStackIndexPayload, 'index'> & {
  index: TypeScriptExpressionBuilder
}

export interface TypeScriptReferenceStackPropertyIndexPayload {
  name: string
  index: TypeScriptExpressionPayload
  optionalChaining?: boolean
}

export type TypeScriptReferenceStackPropertyIndex = Omit<
  TypeScriptReferenceStackPropertyIndexPayload,
  'index'
> & {
  index: TypeScriptExpressionBuilder
}

export interface TypeScriptReferenceStackCallPayload {
  args?: TypeScriptExpressionPayload[]
  optionalChaining?: boolean
  generics?: TypeScriptGenericDeclarationPayload[]
}

export type TypeScriptReferenceStackCall = Omit<
  TypeScriptReferenceStackCallPayload,
  'args' | 'generics'
> & {
  args?: TypeScriptExpressionBuilder[]
  generics?: TypeScriptGenericDeclarationBuilder[]
}

export interface TypeScriptReferenceStackPropertyCallPayload {
  name: string
  args?: TypeScriptExpressionPayload[]
  optionalChaining?: boolean
  generics?: TypeScriptGenericDeclarationPayload[]
}

export type TypeScriptReferenceStackPropertyCall = Omit<
  TypeScriptReferenceStackPropertyCallPayload,
  'args' | 'generics'
> & {
  args?: TypeScriptExpressionBuilder[]
  generics?: TypeScriptGenericDeclarationBuilder[]
}

export interface TypeScriptReferenceStackExpressionPayload {
  expression: TypeScriptExpressionPayload
  optionalChaining?: boolean
}

export type TypeScriptReferenceStackExpression = Omit<
  TypeScriptReferenceStackExpressionPayload,
  'expression'
> & {
  expression: TypeScriptExpressionBuilder
}

export type TypeScriptReferenceStackItem =
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.VALUE,
      TypeScriptReferenceStackValue
    >
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.INDEX,
      TypeScriptReferenceStackIndex
    >
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.PROPERTY_INDEX,
      TypeScriptReferenceStackPropertyIndex
    >
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.CALL,
      TypeScriptReferenceStackCall
    >
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.PROPERTY_CALL,
      TypeScriptReferenceStackPropertyCall
    >
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.EXPRESSION,
      TypeScriptReferenceStackExpression
    >

export type TypeScriptReferenceStackItemPayload =
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.VALUE,
      TypeScriptReferenceStackValuePayload
    >
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.INDEX,
      TypeScriptReferenceStackIndexPayload
    >
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.PROPERTY_INDEX,
      TypeScriptReferenceStackPropertyIndexPayload
    >
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.CALL,
      TypeScriptReferenceStackCallPayload
    >
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.PROPERTY_CALL,
      TypeScriptReferenceStackPropertyCallPayload
    >
  | TypeScriptReferenceStackUnionItem<
      TypeScriptReferenceStackType.EXPRESSION,
      TypeScriptReferenceStackExpressionPayload
    >

export interface TypeScriptReferenceStackPayload {
  statementType: TypeScriptStatementType.REFERENCE
  expressionType: TypeScriptExpressionType.REFERENCE
  reference: TypeScriptReferenceStackItemPayload[]
}

export class TypeScriptReferenceStackBuilder implements Builder<TypeScriptReferenceStackPayload> {
  private reference: TypeScriptReferenceStackItem[] = []

  build(): TypeScriptReferenceStackPayload {
    const { reference } = this

    return {
      statementType: TypeScriptStatementType.REFERENCE,
      expressionType: TypeScriptExpressionType.REFERENCE,
      reference: reference.map((ref) => {
        switch (ref.type) {
          case TypeScriptReferenceStackType.VALUE: {
            return ref
          }
          case TypeScriptReferenceStackType.INDEX: {
            return {
              ...ref,
              index: ref.index.build()
            }
          }
          case TypeScriptReferenceStackType.PROPERTY_INDEX: {
            return {
              ...ref,
              index: ref.index.build()
            }
          }
          case TypeScriptReferenceStackType.CALL: {
            return {
              ...ref,
              args: ref.args?.map((arg) => arg.build()),
              generics: ref.generics?.map((generic) => generic.build())
            }
          }
          case TypeScriptReferenceStackType.PROPERTY_CALL: {
            return {
              ...ref,
              args: ref.args?.map((arg) => arg.build()),
              generics: ref.generics?.map((generic) => generic.build())
            }
          }
          case TypeScriptReferenceStackType.EXPRESSION: {
            return {
              ...ref,
              expression: ref.expression.build()
            }
          }
        }
      })
    }
  }

  addValue(args: TypeScriptReferenceStackValue): TypeScriptReferenceStackBuilder {
    this.reference.push({
      type: TypeScriptReferenceStackType.VALUE,
      ...args
    })

    return this
  }

  addIndex(args: TypeScriptReferenceStackIndex): TypeScriptReferenceStackBuilder {
    this.reference.push({
      type: TypeScriptReferenceStackType.INDEX,
      ...args
    })

    return this
  }

  addPropertyIndex(args: TypeScriptReferenceStackPropertyIndex): TypeScriptReferenceStackBuilder {
    this.reference.push({
      type: TypeScriptReferenceStackType.PROPERTY_INDEX,
      ...args
    })

    return this
  }

  addCall(args: TypeScriptReferenceStackCall): TypeScriptReferenceStackBuilder {
    this.reference.push({
      type: TypeScriptReferenceStackType.CALL,
      ...args
    })

    return this
  }

  addPropertyCall(args: TypeScriptReferenceStackPropertyCall): TypeScriptReferenceStackBuilder {
    this.reference.push({
      type: TypeScriptReferenceStackType.PROPERTY_CALL,
      ...args
    })

    return this
  }

  addExpression(args: TypeScriptReferenceStackExpression): TypeScriptReferenceStackBuilder {
    this.reference.push({
      type: TypeScriptReferenceStackType.EXPRESSION,
      ...args
    })

    return this
  }
}

export const typeScriptReferenceStackBuilderFactory = () => new TypeScriptReferenceStackBuilder()
