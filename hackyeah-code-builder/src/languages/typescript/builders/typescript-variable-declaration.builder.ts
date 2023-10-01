import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import {
  TypeScriptTypeDeclarationBuilder,
  TypeScriptTypeDeclarationPayload
} from './typescript-type-declaration.builder'

export enum TypeScriptDestructureType {
  ARRAY = 'ARRAY',
  OBJECT = 'OBJECT',
  NESTED_OBJECT = 'NESTED_OBJECT',
  RENAME = 'RENAME',
  SPREAD = 'SPREAD'
}

export interface TypesScriptVariableDeclarationRenameValue {
  destructure: TypeScriptDestructureType.RENAME
  currentKey: string
  renamedKey: string
}

export interface TypesScriptVariableDeclarationArrayValue {
  destructure: TypeScriptDestructureType.ARRAY
  items: TypesScriptVariableDeclarationValue[]
}

export interface TypesScriptVariableDeclarationObjectValue {
  destructure: TypeScriptDestructureType.OBJECT
  items: TypesScriptVariableDeclarationValue[]
}

export interface TypesScriptVariableDeclarationNestedObjectValue {
  destructure: TypeScriptDestructureType.NESTED_OBJECT
  items: TypesScriptVariableDeclarationValue[]
  currentKey: string
}

export interface TypesScriptVariableDeclarationSpreadValue {
  destructure: TypeScriptDestructureType.SPREAD
  item: TypeScriptExpressionPayload
}

export type TypesScriptVariableDeclarationValue =
  | string
  | TypesScriptVariableDeclarationRenameValue
  | TypesScriptVariableDeclarationArrayValue
  | TypesScriptVariableDeclarationObjectValue
  | TypesScriptVariableDeclarationNestedObjectValue
  | TypesScriptVariableDeclarationSpreadValue

export interface TypeScriptVariableDeclarationPayload {
  type?: TypeScriptTypeDeclarationPayload
  value: TypesScriptVariableDeclarationValue
  defaultValue?: TypeScriptExpressionPayload
}

export class TypeScriptVariableDeclarationBuilder {
  protected type: TypeScriptTypeDeclarationBuilder
  protected value: TypesScriptVariableDeclarationValue
  protected defaultValue: TypeScriptExpressionBuilder

  setType(type: TypeScriptTypeDeclarationBuilder): this {
    this.type = type

    return this
  }

  setValue(value: TypesScriptVariableDeclarationValue): this {
    this.value = value

    return this
  }

  setDefaultValue(defaultValue: TypeScriptExpressionBuilder): this {
    this.defaultValue = defaultValue

    return this
  }
}
