import { TypeScriptClusterExpressionGenerator } from './typescript-cluster-expression.generator'
import { findControlsByTargetId } from '../../../core'
import {
  TypeScriptComparatorOperator,
  TypeScriptComparatorOperatorBuilder,
  typeScriptComparatorOperatorBuilderFactory,
  TypeScriptExpressionBuilder,
  TypeScriptLogicalOperator,
  typeScriptLogicalOperatorBuilderFactory
} from '../../../languages/typescript'
import { ClusterNodeControlNumberDto } from '../../../models'
import { TypeScriptApiState } from '../apis/typescript.api'

export interface TypeScriptClusterComparatorGeneratorDependencies {
  typeScriptClusterExpressionGenerator: TypeScriptClusterExpressionGenerator
}

export class TypeScriptClusterComparatorGenerator {
  constructor(private readonly dependencies: TypeScriptClusterComparatorGeneratorDependencies) {}

  generateComparator(
    state: TypeScriptApiState,
    operator: TypeScriptComparatorOperator
  ): TypeScriptExpressionBuilder {
    const { typeScriptClusterExpressionGenerator } = this.dependencies
    const valueControls = findControlsByTargetId<
      ClusterNodeControlNumberDto & { targetId: string }
    >({
      controls: state.node.controls,
      targetId: 'value'
    })

    const firstValueControl = valueControls[0]
    const restControls = valueControls.slice(1)
    const comparatorExpressions: TypeScriptComparatorOperatorBuilder[] = []

    for (const control of restControls) {
      comparatorExpressions.push(
        typeScriptComparatorOperatorBuilderFactory()
          .setLeftExpression(
            typeScriptClusterExpressionGenerator.generateExpression(
              state,
              firstValueControl.targetId
            )
          )
          .setOperator(operator)
          .setRightExpression(
            typeScriptClusterExpressionGenerator.generateExpression(state, control.targetId)
          )
      )
    }

    if (comparatorExpressions.length === 1) {
      return comparatorExpressions[0]
    }

    const logicBuilder = typeScriptLogicalOperatorBuilderFactory()
    const lastComparatorExpressionsIndex = comparatorExpressions.length - 1

    for (const [index, comparatorExpression] of comparatorExpressions.entries()) {
      logicBuilder.addExpression(comparatorExpression)

      if (lastComparatorExpressionsIndex !== index) {
        logicBuilder.addOperator(TypeScriptLogicalOperator.AND)
      }
    }

    return logicBuilder
  }
}
