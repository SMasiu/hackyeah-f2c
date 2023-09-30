import { Api, ApiExpressionGenerators, ApiFlowGenerators, DefaultApiState } from './api'

export abstract class StringApi<TState = DefaultApiState> extends Api<TState> {
  flowGenerators: ApiFlowGenerators<TState> = {}
  expressionGenerators: ApiExpressionGenerators<TState> = {
    'string:variable:declaration': this.generateVariableDeclaration.bind(this),
    'string:variable:set': this.generateVariableSet.bind(this),
    'string:comparator:equal': this.generateComparatorEqual.bind(this),
    'string:comparator:not-equal': this.generateComparatorNotEqual.bind(this),
    'string:comparator:lt': this.generateComparatorLt.bind(this),
    'string:comparator:lte': this.generateComparatorLte.bind(this),
    'string:comparator:gt': this.generateComparatorGt.bind(this),
    'string:comparator:gte': this.generateComparatorGte.bind(this),
    'string:transform:to-uppercase': this.generateTransformToUppercase.bind(this)
  }

  abstract generateVariableDeclaration(state: TState): void
  abstract generateVariableSet(state: TState): void
  abstract generateComparatorEqual(state: TState): void
  abstract generateComparatorNotEqual(state: TState): void
  abstract generateComparatorLt(state: TState): void
  abstract generateComparatorLte(state: TState): void
  abstract generateComparatorGt(state: TState): void
  abstract generateComparatorGte(state: TState): void
  abstract generateTransformToUppercase(state: TState): void
}
