import { asClass, AwilixContainer } from 'awilix'
import {
  TypeScriptArgumentDeclarationRenderer,
  TypeScriptArrayValueRenderer,
  TypeScriptBreakRenderer,
  TypeScriptComparatorOperatorRenderer,
  TypeScriptConstantRenderer,
  TypeScriptContinueRenderer,
  TypeScriptDoWhileLoopRenderer,
  TypeScriptExpressionGroupRenderer,
  TypeScriptExpressionRenderer,
  TypeScriptForEachLoopRenderer,
  TypeScriptForIteratorLoopRenderer,
  TypeScriptFunctionalityRenderer,
  TypeScriptIfElseRenderer,
  TypeScriptLogicalOperatorRenderer,
  TypeScriptMathOperatorRenderer,
  TypeScriptNegateOperatorRenderer,
  TypeScriptObjectValueRenderer,
  TypeScriptPrimitiveValueRenderer,
  TypeScriptReassignReferenceRenderer,
  TypeScriptReferenceStackRenderer,
  TypeScriptRenderer,
  TypeScriptReturnRenderer,
  TypeScriptSwitchRenderer,
  TypescriptTernaryOperatorRenderer,
  TypeScriptThrowRenderer,
  TypeScriptTryCatchRenderer,
  TypeScriptVariableDeclarationRenderer,
  TypeScriptVariableRenderer,
  TypeScriptWhileLoopRenderer
} from './renderers'
import { TypeScriptInternalResource } from './resources'
import { TypeScriptExpressionType, TypeScriptStatementType } from './typescript.types'
import { asDictionary } from '../../utils'

export const registerLanguage = (container: AwilixContainer) => {
  const typeScriptRenderer = asClass(TypeScriptRenderer).singleton()
  const typeScriptExpressionRenderer = asClass(TypeScriptExpressionRenderer).singleton()
  const typeScriptArgumentDeclarationRenderer = asClass(
    TypeScriptArgumentDeclarationRenderer
  ).singleton()
  const typeScriptArrayValueRenderer = asClass(TypeScriptArrayValueRenderer).singleton()
  const typeScriptBreakRenderer = asClass(TypeScriptBreakRenderer).singleton()
  const typeScriptComparatorOperatorRenderer = asClass(
    TypeScriptComparatorOperatorRenderer
  ).singleton()
  const typeScriptConstantRenderer = asClass(TypeScriptConstantRenderer).singleton()
  const typeScriptContinueRenderer = asClass(TypeScriptContinueRenderer).singleton()
  const typeScriptDoWhileLoopRenderer = asClass(TypeScriptDoWhileLoopRenderer).singleton()
  const typeScriptExpressionGroupRenderer = asClass(TypeScriptExpressionGroupRenderer).singleton()
  const typeScriptForEachLoopRenderer = asClass(TypeScriptForEachLoopRenderer).singleton()
  const typeScriptForIteratorLoopRenderer = asClass(TypeScriptForIteratorLoopRenderer).singleton()
  const typeScriptFunctionalityRenderer = asClass(TypeScriptFunctionalityRenderer).singleton()
  const typeScriptIfElseRenderer = asClass(TypeScriptIfElseRenderer).singleton()
  const typeScriptLogicalOperatorRenderer = asClass(TypeScriptLogicalOperatorRenderer).singleton()
  const typeScriptMathOperatorRenderer = asClass(TypeScriptMathOperatorRenderer).singleton()
  const typeScriptNegateOperatorRenderer = asClass(TypeScriptNegateOperatorRenderer).singleton()
  const typeScriptPrimitiveValueRenderer = asClass(TypeScriptPrimitiveValueRenderer).singleton()
  const typeScriptObjectValueRenderer = asClass(TypeScriptObjectValueRenderer).singleton()
  const typeScriptReassignReferenceRenderer = asClass(
    TypeScriptReassignReferenceRenderer
  ).singleton()
  const typeScriptReferenceStackRenderer = asClass(TypeScriptReferenceStackRenderer).singleton()
  const typeScriptReturnRenderer = asClass(TypeScriptReturnRenderer).singleton()
  const typeScriptSwitchRenderer = asClass(TypeScriptSwitchRenderer).singleton()
  const typescriptTernaryOperatorRenderer = asClass(TypescriptTernaryOperatorRenderer).singleton()
  const typeScriptThrowRenderer = asClass(TypeScriptThrowRenderer).singleton()
  const typeScriptTryCatchRenderer = asClass(TypeScriptTryCatchRenderer).singleton()
  const typeScriptVariableRenderer = asClass(TypeScriptVariableRenderer).singleton()
  const typeScriptVariableDeclarationRenderer = asClass(
    TypeScriptVariableDeclarationRenderer
  ).singleton()
  const typeScriptWhileLoopRenderer = asClass(TypeScriptWhileLoopRenderer).singleton()

  container.register({
    typeScriptInternalResource: asClass(TypeScriptInternalResource).singleton(),
    typeScriptRenderer,
    typeScriptExpressionRenderer,
    typeScriptArgumentDeclarationRenderer,
    typeScriptArrayValueRenderer,
    typeScriptBreakRenderer,
    typeScriptComparatorOperatorRenderer,
    typeScriptConstantRenderer,
    typeScriptContinueRenderer,
    typeScriptDoWhileLoopRenderer,
    typeScriptExpressionGroupRenderer,
    typeScriptForEachLoopRenderer,
    typeScriptForIteratorLoopRenderer,
    typeScriptFunctionalityRenderer,
    typeScriptIfElseRenderer,
    typeScriptLogicalOperatorRenderer,
    typeScriptMathOperatorRenderer,
    typeScriptNegateOperatorRenderer,
    typeScriptObjectValueRenderer,
    typeScriptPrimitiveValueRenderer,
    typeScriptReassignReferenceRenderer,
    typeScriptReferenceStackRenderer,
    typeScriptReturnRenderer,
    typeScriptSwitchRenderer,
    typescriptTernaryOperatorRenderer,
    typeScriptThrowRenderer,
    typeScriptTryCatchRenderer,
    typeScriptVariableRenderer,
    typeScriptVariableDeclarationRenderer,
    typeScriptWhileLoopRenderer,
    typescriptStatementRenderers: asDictionary<unknown>({
      [TypeScriptStatementType.BREAK]: typeScriptBreakRenderer,
      [TypeScriptStatementType.VARIABLE]: typeScriptVariableRenderer,
      [TypeScriptStatementType.CONSTANT]: typeScriptConstantRenderer,
      [TypeScriptStatementType.CONTINUE]: typeScriptContinueRenderer,
      [TypeScriptStatementType.DO_WHILE]: typeScriptDoWhileLoopRenderer,
      [TypeScriptStatementType.FOR_EACH]: typeScriptForEachLoopRenderer,
      [TypeScriptStatementType.FOR_ITERATOR]: typeScriptForIteratorLoopRenderer,
      [TypeScriptStatementType.FUNCTIONALITY]: typeScriptFunctionalityRenderer,
      [TypeScriptStatementType.IF_ELSE]: typeScriptIfElseRenderer,
      [TypeScriptStatementType.REASSIGN_REFERENCE]: typeScriptReassignReferenceRenderer,
      [TypeScriptStatementType.REFERENCE]: typeScriptReferenceStackRenderer,
      [TypeScriptStatementType.RETURN]: typeScriptReturnRenderer,
      [TypeScriptStatementType.SWITCH]: typeScriptSwitchRenderer,
      [TypeScriptStatementType.TERNARY_OPERATOR]: typescriptTernaryOperatorRenderer,
      [TypeScriptStatementType.THROW]: typeScriptThrowRenderer,
      [TypeScriptStatementType.TRY_CATCH]: typeScriptTryCatchRenderer,
      [TypeScriptStatementType.WHILE]: typeScriptWhileLoopRenderer
    }),
    typescriptExpressionRenderers: asDictionary<unknown>({
      [TypeScriptExpressionType.ARRAY_VALUE]: typeScriptArrayValueRenderer,
      [TypeScriptExpressionType.COMPARATOR_OPERATOR]: typeScriptComparatorOperatorRenderer,
      [TypeScriptExpressionType.EXPRESSION_GROUP]: typeScriptExpressionGroupRenderer,
      [TypeScriptExpressionType.LOGICAL_OPERATOR]: typeScriptLogicalOperatorRenderer,
      [TypeScriptExpressionType.MATH_OPERATOR]: typeScriptMathOperatorRenderer,
      [TypeScriptExpressionType.NEGATE_OPERATOR]: typeScriptNegateOperatorRenderer,
      [TypeScriptExpressionType.OBJECT_VALUE]: typeScriptObjectValueRenderer,
      [TypeScriptExpressionType.PRIMITIVE_VALUE]: typeScriptPrimitiveValueRenderer,
      [TypeScriptExpressionType.REFERENCE]: typeScriptReferenceStackRenderer,
      [TypeScriptExpressionType.TERNARY_OPERATOR]: typescriptTernaryOperatorRenderer
    })
  })

  return typeScriptRenderer
}
