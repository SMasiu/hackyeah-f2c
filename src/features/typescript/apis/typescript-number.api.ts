import { TypeScriptApiState } from './typescript.api'
import { NumberApi } from '../../../apis/number.api'
import {
  typeScriptExpressionBuilderToReferenceStackBuilder,
  TypeScriptComparatorOperator,
  TypeScriptExpressionBuilder
} from '../../../languages/typescript'
import { TypeScriptClusterComparatorGenerator } from '../generators/typescript-cluster-comparator.generator'
import { TypeScriptClusterExpressionGenerator } from '../generators/typescript-cluster-expression.generator'
import { TypeScriptClusterInputGenerator } from '../generators/typescript-cluster-input.generator'
import { TypeScriptClusterSetVariableGenerator } from '../generators/typescript-cluster-set-variable.generator'

export interface TypeScriptNumberApiDependencies {
  typeScriptClusterInputGenerator: TypeScriptClusterInputGenerator
  typeScriptClusterExpressionGenerator: TypeScriptClusterExpressionGenerator
  typeScriptClusterComparatorGenerator: TypeScriptClusterComparatorGenerator
  typeScriptClusterSetVariableGenerator: TypeScriptClusterSetVariableGenerator
}

export class TypeScriptNumberApi extends NumberApi<TypeScriptApiState> {
  constructor(private readonly dependencies: TypeScriptNumberApiDependencies) {
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

  generateComparatorLt(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    return this.dependencies.typeScriptClusterComparatorGenerator.generateComparator(
      state,
      TypeScriptComparatorOperator.LESS_THAN
    )
  }

  generateComparatorLte(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    return this.dependencies.typeScriptClusterComparatorGenerator.generateComparator(
      state,
      TypeScriptComparatorOperator.LESS_OR_EQUAL_THAN
    )
  }

  generateComparatorGt(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    return this.dependencies.typeScriptClusterComparatorGenerator.generateComparator(
      state,
      TypeScriptComparatorOperator.GREATER_THAN
    )
  }

  generateComparatorGte(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    return this.dependencies.typeScriptClusterComparatorGenerator.generateComparator(
      state,
      TypeScriptComparatorOperator.GREATER_OR_EQUAL_THAN
    )
  }

  generateCastToString(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    const { typeScriptClusterExpressionGenerator } = this.dependencies

    return typeScriptExpressionBuilderToReferenceStackBuilder(
      typeScriptClusterExpressionGenerator.generateExpression(state, 'value')
    ).addPropertyCall({ name: 'toString' })
  }
}
