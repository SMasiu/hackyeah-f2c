import {
  TypeScriptArrayValueBuilder,
  TypeScriptArrayValuePayload
} from './typescript-array-value.builder'
import {
  TypeScriptComparatorOperatorBuilder,
  TypeScriptComparatorOperatorPayload
} from './typescript-comparator-operator.builder'
import {
  TypeScriptExpressionGroupBuilder,
  TypeScriptExpressionGroupPayload
} from './typescript-expression-group.builder'
import {
  TypeScriptLogicalOperatorBuilder,
  TypeScriptLogicalOperatorPayload
} from './typescript-logical-operator.builder'
import {
  TypeScriptMathOperatorBuilder,
  TypeScriptMathOperatorPayload
} from './typescript-math-operator.builder'
import {
  TypeScriptNegateOperatorBuilder,
  TypeScriptNegateOperatorPayload
} from './typescript-negate-operator.builder'
import {
  TypeScriptObjectValueBuilder,
  TypeScriptObjectValuePayload
} from './typescript-object-value.builder'
import {
  TypeScriptPrimitiveValueBuilder,
  TypeScriptPrimitiveValuePayload
} from './typescript-primitive-value.builder'
import {
  TypeScriptReferenceStackBuilder,
  TypeScriptReferenceStackPayload
} from './typescript-reference-stack.builder'
import {
  TypescriptTernaryOperatorBuilder,
  TypescriptTernaryOperatorPayload
} from './typescript-ternary-operator.builder'

export type TypeScriptExpressionPayload =
  | TypeScriptPrimitiveValuePayload
  | TypeScriptArrayValuePayload
  | TypeScriptObjectValuePayload
  | TypeScriptNegateOperatorPayload
  | TypeScriptReferenceStackPayload
  | TypescriptTernaryOperatorPayload
  | TypeScriptComparatorOperatorPayload
  | TypeScriptLogicalOperatorPayload
  | TypeScriptMathOperatorPayload
  | TypeScriptExpressionGroupPayload

export type TypeScriptExpressionBuilder =
  | TypeScriptPrimitiveValueBuilder
  | TypeScriptArrayValueBuilder
  | TypeScriptObjectValueBuilder
  | TypeScriptNegateOperatorBuilder
  | TypeScriptReferenceStackBuilder
  | TypescriptTernaryOperatorBuilder
  | TypeScriptComparatorOperatorBuilder
  | TypeScriptLogicalOperatorBuilder
  | TypeScriptMathOperatorBuilder
  | TypeScriptExpressionGroupBuilder
