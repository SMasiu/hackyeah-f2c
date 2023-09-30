import { ApplicationClusterContent, Builder } from '../core'
import { ClusterNodeFunctionalityDto } from '../models'

export type DefaultApiState = Record<string, never>
export type ApiState<TState = DefaultApiState> = {
  node: ClusterNodeFunctionalityDto
  clusterContent: ApplicationClusterContent
} & TState

export type ApiFlowGenerators<TState> = Record<string, (state: TState) => void>
export type ApiExpressionGenerators<TState> = Record<string, (state: TState) => Builder<unknown>>

export abstract class Api<TState = DefaultApiState> {
  protected abstract flowGenerators: ApiFlowGenerators<TState>
  protected abstract expressionGenerators: ApiExpressionGenerators<TState>

  generateFlow(state: ApiState<TState>) {
    this.flowGenerators[state.node.nodeSchemaId](state)
  }

  generateExpression(state: ApiState<TState>) {
    return this.expressionGenerators[state.node.nodeSchemaId](state)
  }
}
