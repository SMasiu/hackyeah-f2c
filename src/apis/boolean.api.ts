import { Api, ApiExpressionGenerators, ApiFlowGenerators, DefaultApiState } from './api'

export abstract class BooleanApi<TState = DefaultApiState> extends Api<TState> {
  flowGenerators: ApiFlowGenerators<TState> = {}
  expressionGenerators: ApiExpressionGenerators<TState> = {
    'boolean:variable:declaration': this.generateVariableDeclaration.bind(this),
    'boolean:variable:set': this.generateVariableSet.bind(this),
    'boolean:comparator:equal': this.generateComparatorEqual.bind(this),
    'boolean:comparator:not-equal': this.generateComparatorNotEqual.bind(this),
    'boolean:operator:negate': this.generateOperatorNegate.bind(this)
  }

  abstract generateVariableDeclaration(state: TState): void
  abstract generateVariableSet(state: TState): void
  abstract generateComparatorEqual(state: TState): void
  abstract generateComparatorNotEqual(state: TState): void
  abstract generateOperatorNegate(state: TState): void
}
