import { TypeScriptBreakBuilder, TypeScriptBreakPayload } from './typescript-break.builder'
import { TypeScriptConstantBuilder, TypeScriptConstantPayload } from './typescript-constant.builder'
import { TypeScriptContinueBuilder, TypeScriptContinuePayload } from './typescript-continue.builder'
import {
  TypeScriptDoWhileLoopBuilder,
  TypeScriptDoWhileLoopPayload
} from './typescript-do-while-loop.builder'
import {
  TypeScriptForEachLoopBuilder,
  TypeScriptForEachLoopPayload
} from './typescript-for-each-loop.builder'
import {
  TypeScriptForIteratorLoopBuilder,
  TypeScriptForIteratorLoopPayload
} from './typescript-for-iterator-loop.builder'
import { TypeScriptIfElseBuilder, TypeScriptIfElsePayload } from './typescript-if-else.builder'
import {
  TypeScriptReassignReferenceBuilder,
  TypeScriptReassignReferencePayload
} from './typescript-reassign-reference.builder'
import {
  TypeScriptReferenceStackBuilder,
  TypeScriptReferenceStackPayload
} from './typescript-reference-stack.builder'
import { TypeScriptReturnBuilder, TypeScriptReturnPayload } from './typescript-return.builder'
import { TypeScriptSwitchBuilder, TypeScriptSwitchPayload } from './typescript-switch.builder'
import {
  TypescriptTernaryOperatorBuilder,
  TypescriptTernaryOperatorPayload
} from './typescript-ternary-operator.builder'
import { TypeScriptThrowBuilder, TypeScriptThrowPayload } from './typescript-throw.builder'
import {
  TypeScriptTryCatchBuilder,
  TypeScriptTryCatchPayload
} from './typescript-try-catch.builder'
import { TypeScriptVariableBuilder, TypeScriptVariablePayload } from './typescript-variable.builder'
import {
  TypeScriptWhileLoopBuilder,
  TypeScriptWhileLoopPayload
} from './typescript-while-loop.builder'
import { Builder } from '../../../core'
import { TypeScriptStatementType } from '../typescript.types'

export type TypeScriptFunctionalityCodeStatementBuilder =
  | TypeScriptVariableBuilder
  | TypeScriptConstantBuilder
  | TypeScriptReferenceStackBuilder
  | TypeScriptReassignReferenceBuilder
  | TypeScriptIfElseBuilder
  | TypeScriptSwitchBuilder
  | TypeScriptTryCatchBuilder
  | TypeScriptForIteratorLoopBuilder
  | TypeScriptForEachLoopBuilder
  | TypeScriptWhileLoopBuilder
  | TypeScriptDoWhileLoopBuilder
  | TypeScriptBreakBuilder
  | TypeScriptContinueBuilder
  | TypescriptTernaryOperatorBuilder
  | TypeScriptReturnBuilder
  | TypeScriptThrowBuilder

export type TypeScriptFunctionalityCodeStatementPayload =
  | TypeScriptVariablePayload
  | TypeScriptConstantPayload
  | TypeScriptReferenceStackPayload
  | TypeScriptReassignReferencePayload
  | TypeScriptIfElsePayload
  | TypeScriptSwitchPayload
  | TypeScriptTryCatchPayload
  | TypeScriptForIteratorLoopPayload
  | TypeScriptForEachLoopPayload
  | TypeScriptWhileLoopPayload
  | TypeScriptDoWhileLoopPayload
  | TypeScriptBreakPayload
  | TypeScriptContinuePayload
  | TypescriptTernaryOperatorPayload
  | TypeScriptReturnPayload
  | TypeScriptThrowPayload

export interface TypeScriptFunctionalityPayload {
  statementType: TypeScriptStatementType.FUNCTIONALITY
  codeStatements: TypeScriptFunctionalityCodeStatementPayload[]
}

export class TypeScriptFunctionalityBuilder implements Builder<TypeScriptFunctionalityPayload> {
  private codeStatements: TypeScriptFunctionalityCodeStatementBuilder[] = []

  build(): TypeScriptFunctionalityPayload {
    const { codeStatements } = this

    return {
      statementType: TypeScriptStatementType.FUNCTIONALITY,
      codeStatements: codeStatements.map((builder) => builder.build())
    }
  }

  addCodeStatement(
    codeStatement: TypeScriptFunctionalityCodeStatementBuilder
  ): TypeScriptFunctionalityBuilder {
    this.codeStatements.push(codeStatement)

    return this
  }

  addCodeStatements(
    codeStatements: TypeScriptFunctionalityCodeStatementBuilder[]
  ): TypeScriptFunctionalityBuilder {
    this.codeStatements.push(...codeStatements)

    return this
  }
}

export const typeScriptFunctionalityBuilderFactory = () => new TypeScriptFunctionalityBuilder()
