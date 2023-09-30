import { Api, ApiExpressionGenerators, ApiFlowGenerators, DefaultApiState } from './api'

export abstract class LoggerApi<TState = DefaultApiState> extends Api<TState> {
  flowGenerators: ApiFlowGenerators<TState> = {
    'logger:message:info': this.generateMessageLog.bind(this)
  }
  expressionGenerators: ApiExpressionGenerators<TState> = {}

  abstract generateMessageLog(state: TState): void
}
