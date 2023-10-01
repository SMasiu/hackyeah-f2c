import { TypeScriptExpressionPayload } from './typescript-expression.builder'
import { Builder } from '../../../core'
import { TypeScriptLogicalOperator, TypeScriptPrimitiveType } from '../typescript.types'

export enum TypeScriptTypeDeclarationType {
  STATIC = 'STATIC',
  REFERENCE = 'REFERENCE',
  OBJECT = 'OBJECT',
  ARRAY = 'ARRAY',
  TUPLE = 'TUPLE',
  LOGICAL = 'LOGICAL',
  GROUP = 'GROUP',
  FUNCTION = 'FUNCTION',
  CONDITION = 'CONDITION',
  STACK_REFERENCE = 'STACK_REFERENCE',
  TEMPLATE_LITERAL = 'TEMPLATE_LITERAL',
  KEYOF = 'KEYOF',
  INFER = 'INFER',
  TYPEOF = 'TYPEOF'
}

export enum TypeScriptTypeObjectKeyType {
  TYPED = 'TYPED',
  ITERATOR = 'ITERATOR'
}

export interface TypeScriptTypeDeclarationValueStatic {
  type: TypeScriptTypeDeclarationType.STATIC
  value: string
  valueType: TypeScriptPrimitiveType
}

export interface TypeScriptTypeDeclarationValueReference {
  type: TypeScriptTypeDeclarationType.REFERENCE
  value: string
  generics?: TypeScriptTypeDeclarationPayload[]
}

export interface TypeScriptTypeDeclarationValueObject {
  type: TypeScriptTypeDeclarationType.OBJECT
  items: Array<{
    key:
      | string
      | {
          keyType: TypeScriptTypeObjectKeyType
          keyName: string
          itemType: TypeScriptTypeDeclarationValue
        }
    isOptional?: boolean
    isReadonly?: boolean
    itemType: TypeScriptTypeDeclarationValue
  }>
}

export interface TypeScriptTypeDeclarationValueArray {
  type: TypeScriptTypeDeclarationType.ARRAY
  itemType: TypeScriptTypeDeclarationValue
}

export interface TypeScriptTypeDeclarationValueTuple {
  type: TypeScriptTypeDeclarationType.TUPLE
  items: TypeScriptTypeDeclarationValue[]
}

export interface TypeScriptTypeDeclarationValueLogical {
  type: TypeScriptTypeDeclarationType.LOGICAL
  items: Array<TypeScriptTypeDeclarationValue | TypeScriptLogicalOperator>
}

export interface TypeScriptTypeDeclarationValueGroup {
  type: TypeScriptTypeDeclarationType.GROUP
  itemType: TypeScriptTypeDeclarationValue
}

export interface TypeScriptTypeDeclarationValueFunction {
  type: TypeScriptTypeDeclarationType.FUNCTION
  args: Array<{ name: string; type: TypeScriptTypeDeclarationValue; isRestParam?: boolean }>
  returnType: TypeScriptTypeDeclarationValue
}

export interface TypeScriptTypeDeclarationValueCondition {
  type: TypeScriptTypeDeclarationType.CONDITION
  check: TypeScriptTypeDeclarationValue
  expect: TypeScriptTypeDeclarationValue
  positive: TypeScriptTypeDeclarationValue
  negative: TypeScriptTypeDeclarationValue
}

export interface TypeScriptTypeDeclarationValueStackReference {
  type: TypeScriptTypeDeclarationType.STACK_REFERENCE
  baseType: TypeScriptTypeDeclarationValue
  items: TypeScriptTypeDeclarationValue[]
}

export interface TypeScriptTypeDeclarationValueTemplateLiteral {
  type: TypeScriptTypeDeclarationType.TEMPLATE_LITERAL
}

export interface TypeScriptTypeDeclarationValueTemplateKeyof {
  type: TypeScriptTypeDeclarationType.KEYOF
  itemType: TypeScriptTypeDeclarationValue
}

export interface TypeScriptTypeDeclarationValueTemplateInfer {
  type: TypeScriptTypeDeclarationType.INFER
  itemType: TypeScriptTypeDeclarationValue
}

export interface TypeScriptTypeDeclarationValueTemplateTypeof {
  type: TypeScriptTypeDeclarationType.TYPEOF
  value: TypeScriptExpressionPayload
}

export type TypeScriptTypeDeclarationValue =
  | TypeScriptTypeDeclarationValueStatic
  | TypeScriptTypeDeclarationValueReference
  | TypeScriptTypeDeclarationValueObject
  | TypeScriptTypeDeclarationValueArray
  | TypeScriptTypeDeclarationValueTuple
  | TypeScriptTypeDeclarationValueLogical
  | TypeScriptTypeDeclarationValueGroup
  | TypeScriptTypeDeclarationValueFunction
  | TypeScriptTypeDeclarationValueCondition
  | TypeScriptTypeDeclarationValueStackReference
  | TypeScriptTypeDeclarationValueTemplateLiteral
  | TypeScriptTypeDeclarationValueTemplateKeyof
  | TypeScriptTypeDeclarationValueTemplateInfer
  | TypeScriptTypeDeclarationValueTemplateTypeof

export interface TypeScriptTypeDeclarationPayload {
  value: TypeScriptTypeDeclarationValue
}

export class TypeScriptTypeDeclarationBuilder implements Builder<TypeScriptTypeDeclarationPayload> {
  private value: TypeScriptTypeDeclarationValue

  build(): TypeScriptTypeDeclarationPayload {
    const { value } = this

    return {
      value
    }
  }

  setValue(value: TypeScriptTypeDeclarationValue): TypeScriptTypeDeclarationBuilder {
    this.value = value

    return this
  }
}

export const typeScriptTypeDeclarationBuilderFactory = () => new TypeScriptTypeDeclarationBuilder()
