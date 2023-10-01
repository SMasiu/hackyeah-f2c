import { TypeScriptApiState } from './typescript.api'
import { StringApi } from '../../../apis/string.api'
import {
  typeScriptExpressionBuilderToReferenceStackBuilder,
  TypeScriptComparatorOperator,
  TypeScriptExpressionBuilder
} from '../../../languages/typescript'
import { TypeScriptClusterComparatorGenerator } from '../generators/typescript-cluster-comparator.generator'
import { TypeScriptClusterExpressionGenerator } from '../generators/typescript-cluster-expression.generator'
import { TypeScriptClusterInputGenerator } from '../generators/typescript-cluster-input.generator'
import { TypeScriptClusterSetVariableGenerator } from '../generators/typescript-cluster-set-variable.generator'

export interface TypeScriptStringApiDependencies {
  typeScriptClusterExpressionGenerator: TypeScriptClusterExpressionGenerator
  typeScriptClusterInputGenerator: TypeScriptClusterInputGenerator
  typeScriptClusterComparatorGenerator: TypeScriptClusterComparatorGenerator
  typeScriptClusterSetVariableGenerator: TypeScriptClusterSetVariableGenerator
}

export class TypeScriptStringApi extends StringApi<TypeScriptApiState> {
  constructor(private readonly dependencies: TypeScriptStringApiDependencies) {
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

  generateTransformToUppercase(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    const { typeScriptClusterExpressionGenerator } = this.dependencies

    return typeScriptExpressionBuilderToReferenceStackBuilder(
      typeScriptClusterExpressionGenerator.generateExpression(state, 'value')
    ).addPropertyCall({ name: 'toUppercase' })
  }
}
