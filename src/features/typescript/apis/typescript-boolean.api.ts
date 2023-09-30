import { TypeScriptApiState } from './typescript.api'
import { BooleanApi } from '../../../apis/boolean.api'
import {
  TypeScriptComparatorOperator,
  TypeScriptExpressionBuilder,
  typeScriptNegateOperatorBuilderFactory
} from '../../../languages/typescript'
import { TypeScriptClusterComparatorGenerator } from '../generators/typescript-cluster-comparator.generator'
import { TypeScriptClusterExpressionGenerator } from '../generators/typescript-cluster-expression.generator'
import { TypeScriptClusterInputGenerator } from '../generators/typescript-cluster-input.generator'
import { TypeScriptClusterSetVariableGenerator } from '../generators/typescript-cluster-set-variable.generator'

export interface TypeScriptBooleanApiDependencies {
  typeScriptClusterExpressionGenerator: TypeScriptClusterExpressionGenerator
  typeScriptClusterInputGenerator: TypeScriptClusterInputGenerator
  typeScriptClusterComparatorGenerator: TypeScriptClusterComparatorGenerator
  typeScriptClusterSetVariableGenerator: TypeScriptClusterSetVariableGenerator
}

export class TypeScriptBooleanApi extends BooleanApi<TypeScriptApiState> {
  constructor(private readonly dependencies: TypeScriptBooleanApiDependencies) {
    super()
  }

  generateVariableDeclaration({ node }: TypeScriptApiState): TypeScriptExpressionBuilder {
    const { typeScriptClusterInputGenerator } = this.dependencies

    return typeScriptClusterInputGenerator.generateExpressionBySourceId(
      node,
      'value'
    ) as TypeScriptExpressionBuilder
  }

  generateVariableSet(state: TypeScriptApiState) {
    return this.dependencies.typeScriptClusterSetVariableGenerator.generateVariableSet(state)
  }

  generateComparatorEqual(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    return this.dependencies.typeScriptClusterComparatorGenerator.generateComparator(
      state,
      TypeScriptComparatorOperator.STRONG_EQUALS
    )
  }

  generateComparatorNotEqual(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    return this.dependencies.typeScriptClusterComparatorGenerator.generateComparator(
      state,
      TypeScriptComparatorOperator.STRONG_NOT_EQUALS
    )
  }

  generateOperatorNegate(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    const { typeScriptClusterExpressionGenerator } = this.dependencies

    return typeScriptNegateOperatorBuilderFactory().setValue(
      typeScriptClusterExpressionGenerator.generateExpression(state, 'value')
    )
  }
}
