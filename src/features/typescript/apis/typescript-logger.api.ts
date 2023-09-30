import { TypeScriptApiState } from './typescript.api'
import { LoggerApi } from '../../../apis/logger.api'
import { typeScriptReferenceStackBuilderFactory } from '../../../languages/typescript'
import { TypeScriptClusterExpressionGenerator } from '../generators/typescript-cluster-expression.generator'

export interface TypeScriptLoggerApiDependencies {
  typeScriptClusterExpressionGenerator: TypeScriptClusterExpressionGenerator
}

export class TypeScriptLoggerApi extends LoggerApi<TypeScriptApiState> {
  constructor(private readonly dependencies: TypeScriptLoggerApiDependencies) {
    super()
  }

  generateMessageLog(state: TypeScriptApiState) {
    const { builder } = state
    const { typeScriptClusterExpressionGenerator } = this.dependencies

    builder.addCodeStatement(
      typeScriptReferenceStackBuilderFactory()
        .addValue({ name: 'console' })
        .addPropertyCall({
          name: 'log',
          args: [typeScriptClusterExpressionGenerator.generateExpression(state, 'message')]
        })
    )
  }
}
