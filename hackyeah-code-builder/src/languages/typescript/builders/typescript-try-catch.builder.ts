import {
  TypeScriptArgumentDeclarationBuilder,
  TypeScriptArgumentDeclarationPayload
} from './typescript-argument-declaration.builder'
import {
  TypeScriptFunctionalityBuilder,
  TypeScriptFunctionalityPayload
} from './typescript-functionality.builder'
import { Builder } from '../../../core'
import { TypeScriptStatementType } from '../typescript.types'

export interface TypeScriptTryCatchPayload {
  statementType: TypeScriptStatementType.TRY_CATCH
  tryFunctionality: TypeScriptFunctionalityPayload
  catchFunctionality: TypeScriptFunctionalityPayload
  catchArg?: TypeScriptArgumentDeclarationPayload
  finallyFunctionality?: TypeScriptFunctionalityPayload
}

export class TypeScriptTryCatchBuilder implements Builder<TypeScriptTryCatchPayload> {
  private tryFunctionality: TypeScriptFunctionalityBuilder
  private catchFunctionality: TypeScriptFunctionalityBuilder
  private catchArg: TypeScriptArgumentDeclarationBuilder
  private finallyFunctionality: TypeScriptFunctionalityBuilder

  build(): TypeScriptTryCatchPayload {
    const { tryFunctionality, catchFunctionality, catchArg, finallyFunctionality } = this

    return {
      statementType: TypeScriptStatementType.TRY_CATCH,
      tryFunctionality: tryFunctionality.build(),
      catchFunctionality: catchFunctionality.build(),
      catchArg: catchArg?.build(),
      finallyFunctionality: finallyFunctionality?.build()
    }
  }
  setTryFunctionality(functionality: TypeScriptFunctionalityBuilder): TypeScriptTryCatchBuilder {
    this.tryFunctionality = functionality

    return this
  }

  setCatchFunctionality(functionality: TypeScriptFunctionalityBuilder): TypeScriptTryCatchBuilder {
    this.catchFunctionality = functionality

    return this
  }

  setCatchArg(catchArg: TypeScriptArgumentDeclarationBuilder): TypeScriptTryCatchBuilder {
    this.catchArg = catchArg

    return this
  }

  setFinallyFunctionality(
    functionality: TypeScriptFunctionalityBuilder
  ): TypeScriptTryCatchBuilder {
    this.finallyFunctionality = functionality

    return this
  }
}

export const typeScriptTryCatchBuilderFactory = () => new TypeScriptTryCatchBuilder()
