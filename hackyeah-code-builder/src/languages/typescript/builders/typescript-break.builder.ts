import { Builder } from '../../../core'
import { TypeScriptStatementType } from '../typescript.types'

export interface TypeScriptBreakPayload {
  statementType: TypeScriptStatementType.BREAK
}

export class TypeScriptBreakBuilder implements Builder<TypeScriptBreakPayload> {
  build(): TypeScriptBreakPayload {
    return {
      statementType: TypeScriptStatementType.BREAK
    }
  }
}

export const typeScriptBreakBuilderFactory = () => new TypeScriptBreakBuilder()
