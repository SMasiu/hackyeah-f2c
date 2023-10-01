import { Builder } from '../../../core'
import { TypeScriptStatementType } from '../typescript.types'

export interface TypeScriptContinuePayload {
  statementType: TypeScriptStatementType.CONTINUE
}

export class TypeScriptContinueBuilder implements Builder<TypeScriptContinuePayload> {
  build(): TypeScriptContinuePayload {
    return {
      statementType: TypeScriptStatementType.CONTINUE
    }
  }
}

export const typeScriptContinueBuilderFactory = () => new TypeScriptContinueBuilder()
