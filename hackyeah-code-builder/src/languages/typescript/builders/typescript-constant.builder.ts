import {
  TypeScriptVariableDeclarationBuilder,
  TypeScriptVariableDeclarationPayload
} from './typescript-variable-declaration.builder'
import { Builder } from '../../../core'
import { TypeScriptStatementType } from '../typescript.types'

export type TypeScriptConstantPayload = TypeScriptVariableDeclarationPayload & {
  statementType: TypeScriptStatementType.CONSTANT
  isExported: boolean
}

export class TypeScriptConstantBuilder
  extends TypeScriptVariableDeclarationBuilder
  implements Builder<TypeScriptConstantPayload>
{
  private isExported = false

  build(): TypeScriptConstantPayload {
    const { defaultValue, isExported, type, value } = this

    return {
      statementType: TypeScriptStatementType.CONSTANT,
      isExported,
      type: type?.build(),
      value,
      defaultValue: defaultValue?.build()
    }
  }

  markAsExported(): TypeScriptConstantBuilder {
    this.isExported = true

    return this
  }
}

export const typeScriptConstantBuilderFactory = () => new TypeScriptConstantBuilder()
