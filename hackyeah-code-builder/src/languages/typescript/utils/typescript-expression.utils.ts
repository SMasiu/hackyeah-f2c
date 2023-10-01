import {
  TypeScriptExpressionBuilder,
  typeScriptExpressionGroupBuilderFactory,
  TypeScriptReferenceStackBuilder,
  typeScriptReferenceStackBuilderFactory
} from '../builders'

export const typeScriptExpressionBuilderToReferenceStackBuilder = (
  expression: TypeScriptExpressionBuilder
): TypeScriptReferenceStackBuilder => {
  if (expression instanceof TypeScriptReferenceStackBuilder) {
    return expression
  }

  return typeScriptReferenceStackBuilderFactory().addExpression({
    expression: typeScriptExpressionGroupBuilderFactory().setExpression(expression)
  })
}
