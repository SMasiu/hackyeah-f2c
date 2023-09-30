import { TypeScriptClusterExpressionGenerator } from './typescript-cluster-expression.generator'
import {
  typeScriptReassignReferenceBuilderFactory,
  TypeScriptReferenceStackBuilder
} from '../../../languages/typescript'
import { TypeScriptApiState } from '../apis/typescript.api'

export interface TypeScriptClusterSetVariableGeneratorDependencies {
  typeScriptClusterExpressionGenerator: TypeScriptClusterExpressionGenerator
}

export class TypeScriptClusterSetVariableGenerator {
  constructor(private readonly dependencies: TypeScriptClusterSetVariableGeneratorDependencies) {}

  generateVariableSet(state: TypeScriptApiState) {
    const { typeScriptClusterExpressionGenerator } = this.dependencies
    const { builder } = state

    builder.addCodeStatement(
      typeScriptReassignReferenceBuilderFactory()
        .setReference(
          typeScriptClusterExpressionGenerator.generateExpression(
            state,
            'variable'
          ) as TypeScriptReferenceStackBuilder
        )
        .setValue(typeScriptClusterExpressionGenerator.generateExpression(state, 'value'))
    )
  }
}
