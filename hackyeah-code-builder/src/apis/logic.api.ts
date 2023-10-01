import { Api, ApiExpressionGenerators, ApiFlowGenerators, DefaultApiState } from './api'

export abstract class LogicApi<TState = DefaultApiState> extends Api<TState> {
  flowGenerators: ApiFlowGenerators<TState> = {}
  expressionGenerators: ApiExpressionGenerators<TState> = {
    'logic:operator:and': this.generateAndOperator.bind(this),
    'logic:operator:or': this.generateOrOperator.bind(this)
  }

  abstract generateAndOperator(state: TState): void
  abstract generateOrOperator(state: TState): void
}
