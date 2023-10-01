import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import {
  TypeScriptFunctionalityBuilder,
  TypeScriptFunctionalityPayload
} from './typescript-functionality.builder'
import {
  TypeScriptReassignReferenceBuilder,
  TypeScriptReassignReferencePayload
} from './typescript-reassign-reference.builder'
import { TypeScriptVariableBuilder, TypeScriptVariablePayload } from './typescript-variable.builder'
import { Builder } from '../../../core'
import { TypeScriptStatementType } from '../typescript.types'

export interface TypeScriptForIteratorLoopPayload {
  statementType: TypeScriptStatementType.FOR_ITERATOR
  variable: TypeScriptVariablePayload
  expression: TypeScriptExpressionPayload
  reassignVariable: TypeScriptReassignReferencePayload
  functionality: TypeScriptFunctionalityPayload
}

export class TypeScriptForIteratorLoopBuilder implements Builder<TypeScriptForIteratorLoopPayload> {
  private variable: TypeScriptVariableBuilder
  private expression: TypeScriptExpressionBuilder
  private reassignVariable: TypeScriptReassignReferenceBuilder
  private functionality: TypeScriptFunctionalityBuilder

  build(): TypeScriptForIteratorLoopPayload {
    const { variable, expression, reassignVariable, functionality } = this

    return {
      statementType: TypeScriptStatementType.FOR_ITERATOR,
      variable: variable.build(),
      expression: expression.build(),
      reassignVariable: reassignVariable.build(),
      functionality: functionality.build()
    }
  }

  setVariable(variable: TypeScriptVariableBuilder): TypeScriptForIteratorLoopBuilder {
    this.variable = variable

    return this
  }

  setExpression(expression: TypeScriptExpressionBuilder): TypeScriptForIteratorLoopBuilder {
    this.expression = expression

    return this
  }

  setReassignVariable(
    reassignVariable: TypeScriptReassignReferenceBuilder
  ): TypeScriptForIteratorLoopBuilder {
    this.reassignVariable = reassignVariable

    return this
  }

  setFunctionality(
    functionality: TypeScriptFunctionalityBuilder
  ): TypeScriptForIteratorLoopBuilder {
    this.functionality = functionality

    return this
  }
}

export const typeScriptForIteratorLoopBuilderFactory = () => new TypeScriptForIteratorLoopBuilder()
