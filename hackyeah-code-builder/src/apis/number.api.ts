import { Api, ApiExpressionGenerators, ApiFlowGenerators, DefaultApiState } from './api'
;('number:comparator:equal')
;('number:comparator:not-equal')
;('number:comparator:lt')
;('number:comparator:lte')
;('number:comparator:gt')
;('number:comparator:gte')
;('number:variable:set')

export abstract class NumberApi<TState = DefaultApiState> extends Api<TState> {
  flowGenerators: ApiFlowGenerators<TState> = {}
  expressionGenerators: ApiExpressionGenerators<TState> = {
    'number:variable:declaration': this.generateVariableDeclaration.bind(this),
    'number:variable:set': this.generateVariableSet.bind(this),
    'number:comparator:equal': this.generateComparatorEqual.bind(this),
    'number:comparator:not-equal': this.generateComparatorNotEqual.bind(this),
    'number:comparator:lt': this.generateComparatorLt.bind(this),
    'number:comparator:lte': this.generateComparatorLte.bind(this),
    'number:comparator:gt': this.generateComparatorGt.bind(this),
    'number:comparator:gte': this.generateComparatorGte.bind(this),
    'number:cast:to-string': this.generateCastToString.bind(this)
  }

  abstract generateVariableDeclaration(state: TState): void
  abstract generateVariableSet(state: TState): void
  abstract generateComparatorEqual(state: TState): void
  abstract generateComparatorNotEqual(state: TState): void
  abstract generateComparatorLt(state: TState): void
  abstract generateComparatorLte(state: TState): void
  abstract generateComparatorGt(state: TState): void
  abstract generateComparatorGte(state: TState): void
  abstract generateCastToString(state: TState): void
}
