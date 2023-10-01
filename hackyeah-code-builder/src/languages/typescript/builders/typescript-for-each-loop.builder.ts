import { TypeScriptConstantBuilder, TypeScriptConstantPayload } from './typescript-constant.builder'
import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import {
  TypeScriptFunctionalityBuilder,
  TypeScriptFunctionalityPayload
} from './typescript-functionality.builder'
import { Builder } from '../../../core'
import { TypeScriptForEachType, TypeScriptStatementType } from '../typescript.types'

export interface TypeScriptForEachLoopPayload {
  statementType: TypeScriptStatementType.FOR_EACH
  constant: TypeScriptConstantPayload
  iterable: TypeScriptExpressionPayload
  functionality: TypeScriptFunctionalityPayload
  type: TypeScriptForEachType
}

export class TypeScriptForEachLoopBuilder implements Builder<TypeScriptForEachLoopPayload> {
  private constant: TypeScriptConstantBuilder
  private iterable: TypeScriptExpressionBuilder
  private functionality: TypeScriptFunctionalityBuilder
  private type: TypeScriptForEachType

  build(): TypeScriptForEachLoopPayload {
    const { constant, iterable, functionality, type } = this

    return {
      statementType: TypeScriptStatementType.FOR_EACH,
      constant: constant.build(),
      iterable: iterable.build(),
      functionality: functionality.build(),
      type
    }
  }

  setConstant(constant: TypeScriptConstantBuilder): TypeScriptForEachLoopBuilder {
    this.constant = constant

    return this
  }

  setIterable(iterable: TypeScriptExpressionBuilder): TypeScriptForEachLoopBuilder {
    this.iterable = iterable

    return this
  }

  setFunctionality(functionality: TypeScriptFunctionalityBuilder): TypeScriptForEachLoopBuilder {
    this.functionality = functionality

    return this
  }

  setType(type: TypeScriptForEachType): TypeScriptForEachLoopBuilder {
    this.type = type

    return this
  }
}

export const typeScriptForEachLoopBuilderFactory = () => new TypeScriptForEachLoopBuilder()
