import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import {
  TypeScriptFunctionalityBuilder,
  TypeScriptFunctionalityPayload
} from './typescript-functionality.builder'
import { Builder } from '../../../core'
import { TypeScriptStatementType } from '../typescript.types'

export interface TypeScriptWhileLoopPayload {
  statementType: TypeScriptStatementType.WHILE
  expression: TypeScriptExpressionPayload
  functionality: TypeScriptFunctionalityPayload
}

export class TypeScriptWhileLoopBuilder implements Builder<TypeScriptWhileLoopPayload> {
  private expression: TypeScriptExpressionBuilder
  private functionality: TypeScriptFunctionalityBuilder

  build(): TypeScriptWhileLoopPayload {
    const { expression, functionality } = this

    return {
      statementType: TypeScriptStatementType.WHILE,
      expression: expression.build(),
      functionality: functionality.build()
    }
  }

  setExpression(expression: TypeScriptExpressionBuilder): TypeScriptWhileLoopBuilder {
    this.expression = expression

    return this
  }

  setFunctionality(functionality: TypeScriptFunctionalityBuilder): TypeScriptWhileLoopBuilder {
    this.functionality = functionality

    return this
  }
}

export const typeScriptWhileLoopBuilderFactory = () => new TypeScriptWhileLoopBuilder()
