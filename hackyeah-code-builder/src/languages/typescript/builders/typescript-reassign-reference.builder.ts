import {
  TypeScriptExpressionBuilder,
  TypeScriptExpressionPayload
} from './typescript-expression.builder'
import {
  TypeScriptReferenceStackBuilder,
  TypeScriptReferenceStackPayload
} from './typescript-reference-stack.builder'
import { Builder } from '../../../core'
import { TypeScriptMathOperator, TypeScriptStatementType } from '../typescript.types'

export interface TypeScriptReassignReferencePayload {
  statementType: TypeScriptStatementType.REASSIGN_REFERENCE
  reference: TypeScriptReferenceStackPayload
  value: TypeScriptExpressionPayload
  mathOperator?: TypeScriptMathOperator
}

export class TypeScriptReassignReferenceBuilder
  implements Builder<TypeScriptReassignReferencePayload>
{
  private reference: TypeScriptReferenceStackBuilder
  private value: TypeScriptExpressionBuilder
  private mathOperator: TypeScriptMathOperator

  build(): TypeScriptReassignReferencePayload {
    const { reference, value, mathOperator } = this

    return {
      statementType: TypeScriptStatementType.REASSIGN_REFERENCE,
      reference: reference.build(),
      value: value.build(),
      mathOperator
    }
  }

  setReference(reference: TypeScriptReferenceStackBuilder): TypeScriptReassignReferenceBuilder {
    this.reference = reference

    return this
  }

  setValue(value: TypeScriptExpressionBuilder): TypeScriptReassignReferenceBuilder {
    this.value = value

    return this
  }

  setMathOperator(mathOperator: TypeScriptMathOperator): TypeScriptReassignReferenceBuilder {
    this.mathOperator = mathOperator

    return this
  }
}

export const typeScriptReassignReferenceBuilderFactory = () =>
  new TypeScriptReassignReferenceBuilder()
