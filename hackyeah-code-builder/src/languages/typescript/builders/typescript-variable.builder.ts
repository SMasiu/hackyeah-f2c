import {
  TypeScriptVariableDeclarationBuilder,
  TypeScriptVariableDeclarationPayload
} from './typescript-variable-declaration.builder'
import { Builder } from '../../../core'
import { TypeScriptStatementType } from '../typescript.types'

export type TypeScriptVariablePayload = TypeScriptVariableDeclarationPayload & {
  statementType: TypeScriptStatementType.VARIABLE
  isExported: boolean
}

export class TypeScriptVariableBuilder
  extends TypeScriptVariableDeclarationBuilder
  implements Builder<TypeScriptVariablePayload>
{
  private isExported = false

  build(): TypeScriptVariablePayload {
    const { defaultValue, isExported, type, value } = this

    return {
      statementType: TypeScriptStatementType.VARIABLE,
      isExported,
      type: type?.build(),
      value,
      defaultValue: defaultValue?.build()
    }
  }

  markAsExported(): TypeScriptVariableBuilder {
    this.isExported = true

    return this
  }
}

export const typeScriptVariableBuilderFactory = () => new TypeScriptVariableBuilder()
