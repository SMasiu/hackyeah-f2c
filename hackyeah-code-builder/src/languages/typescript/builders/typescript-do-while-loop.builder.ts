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

export interface TypeScriptDoWhileLoopPayload {
  statementType: TypeScriptStatementType.DO_WHILE
  expression: TypeScriptExpressionPayload
  functionality: TypeScriptFunctionalityPayload
}

export class TypeScriptDoWhileLoopBuilder implements Builder<TypeScriptDoWhileLoopPayload> {
  private expression: TypeScriptExpressionBuilder
  private functionality: TypeScriptFunctionalityBuilder

  build(): TypeScriptDoWhileLoopPayload {
    const { expression, functionality } = this

    return {
      statementType: TypeScriptStatementType.DO_WHILE,
      expression: expression.build(),
      functionality: functionality.build()
    }
  }

  setExpression(expression: TypeScriptExpressionBuilder): TypeScriptDoWhileLoopBuilder {
    this.expression = expression

    return this
  }

  setFunctionality(functionality: TypeScriptFunctionalityBuilder): TypeScriptDoWhileLoopBuilder {
    this.functionality = functionality

    return this
  }
}

export const typeScriptDoWhileLoopBuilderFactory = () => new TypeScriptDoWhileLoopBuilder()
