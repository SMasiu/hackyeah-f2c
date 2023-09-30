import { TypeScriptApiState } from './typescript.api'
import { LogicApi } from '../../../apis/logic.api'
import { findControlsByTargetId } from '../../../core'
import {
  TypeScriptExpressionBuilder,
  TypeScriptLogicalOperator,
  typeScriptLogicalOperatorBuilderFactory
} from '../../../languages/typescript'
import { ClusterNodeControlInputExpressionDto } from '../../../models'
import { TypeScriptClusterExpressionGenerator } from '../generators/typescript-cluster-expression.generator'

export interface TypeScriptLogicApiDependencies {
  typeScriptClusterExpressionGenerator: TypeScriptClusterExpressionGenerator
}

export class TypeScriptLogicApi extends LogicApi<TypeScriptApiState> {
  constructor(private readonly dependencies: TypeScriptLogicApiDependencies) {
    super()
  }

  generateAndOperator(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    return this.generateLogicalOperator(state, TypeScriptLogicalOperator.AND)
  }

  generateOrOperator(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    return this.generateLogicalOperator(state, TypeScriptLogicalOperator.OR)
  }

  private generateLogicalOperator(
    state: TypeScriptApiState,
    operator: TypeScriptLogicalOperator
  ): TypeScriptExpressionBuilder {
    const { typeScriptClusterExpressionGenerator } = this.dependencies
    const valueControls = findControlsByTargetId<ClusterNodeControlInputExpressionDto>({
      controls: state.node.controls,
      targetId: 'value'
    })

    const logicBuilder = typeScriptLogicalOperatorBuilderFactory()
    const lastControlIndex = valueControls.length - 1

    for (const [index, control] of valueControls.entries()) {
      logicBuilder.addExpression(
        typeScriptClusterExpressionGenerator.generateExpression(state, control.targetId)
      )

      if (lastControlIndex !== index) {
        logicBuilder.addOperator(operator)
      }
    }

    return logicBuilder
  }
}
