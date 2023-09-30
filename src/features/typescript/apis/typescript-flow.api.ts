import { TypeScriptApiState } from './typescript.api'
import { FlowApi } from '../../../apis/flow.api'
import { findControlBySourceId, findControlsBySourceId } from '../../../core'
import {
  mapVariableReferenceToTypeScriptName,
  typeScriptBreakBuilderFactory,
  typeScriptContinueBuilderFactory,
  typeScriptDoWhileLoopBuilderFactory,
  TypeScriptExpressionBuilder,
  typeScriptForIteratorLoopBuilderFactory,
  TypeScriptIfElseBuilder,
  TypeScriptMathOperator,
  typeScriptPrimitiveValueBuilderFactory,
  typeScriptReassignReferenceBuilderFactory,
  typeScriptReferenceStackBuilderFactory,
  typeScriptReturnBuilderFactory,
  typescriptTernaryOperatorBuilderFactory,
  typeScriptVariableBuilderFactory,
  typeScriptWhileLoopBuilderFactory
} from '../../../languages/typescript'
import {
  ClusterNodeControlExpressionToFlowDto,
  ClusterNodeControlOutputFlowDto
} from '../../../models'
import { TypeScriptClusterBranchGenerator } from '../generators/typescript-cluster-branch.generator'
import { TypeScriptClusterExpressionGenerator } from '../generators/typescript-cluster-expression.generator'

export interface TypeScriptFlowApiDependencies {
  typeScriptClusterBranchGenerator: TypeScriptClusterBranchGenerator
  typeScriptClusterExpressionGenerator: TypeScriptClusterExpressionGenerator
}

export class TypeScriptFlowApi extends FlowApi<TypeScriptApiState> {
  constructor(private readonly dependencies: TypeScriptFlowApiDependencies) {
    super()
  }

  generateInputRef() {
    return
  }

  generateOutputSuccess({ builder }: TypeScriptApiState) {
    builder.addCodeStatement(typeScriptReturnBuilderFactory())
  }

  generateExpressionToFlow({ node, clusterContent, builder }: TypeScriptApiState) {
    const { typeScriptClusterBranchGenerator } = this.dependencies
    const { controls } = node

    const conditionStatement = new TypeScriptIfElseBuilder()

    const positivePaths = findControlsBySourceId<ClusterNodeControlExpressionToFlowDto>({
      controls,
      sourceId: 'true'
    })

    const fallbackPath = findControlBySourceId<ClusterNodeControlOutputFlowDto>({
      controls,
      sourceId: 'false'
    })

    for (const path of positivePaths) {
      const functionality = typeScriptClusterBranchGenerator.generateBranch(
        clusterContent.getFunctionalityBranch(node.id, path.sourceId),
        clusterContent
      )

      conditionStatement.addPath({
        expression: typeScriptPrimitiveValueBuilderFactory().setBooleanValue(true),
        functionality
      })
    }

    if (fallbackPath) {
      const functionality = typeScriptClusterBranchGenerator.generateBranch(
        clusterContent.getFunctionalityBranch(node.id, fallbackPath.sourceId),
        clusterContent
      )

      conditionStatement.setFallback(functionality)
    }

    builder.addCodeStatement(conditionStatement)
  }

  generateLoopRange({ node, builder, clusterContent }: TypeScriptApiState) {
    const { typeScriptClusterBranchGenerator } = this.dependencies
    const { controls } = node

    const loopPath = findControlBySourceId<ClusterNodeControlOutputFlowDto>({
      controls,
      sourceId: 'body'
    })

    if (!loopPath) return

    const functionality = typeScriptClusterBranchGenerator.generateBranch(
      clusterContent.getFunctionalityBranch(node.id, loopPath.sourceId),
      clusterContent
    )

    const variableName = 'i'

    builder.addCodeStatement(
      typeScriptForIteratorLoopBuilderFactory()
        .setFunctionality(functionality)
        .setExpression(typeScriptPrimitiveValueBuilderFactory().setBooleanValue(true))
        .setVariable(
          typeScriptVariableBuilderFactory()
            .setValue(variableName)
            .setDefaultValue(typeScriptPrimitiveValueBuilderFactory().setNumberValue(0))
        )
        .setReassignVariable(
          typeScriptReassignReferenceBuilderFactory()
            .setReference(typeScriptReferenceStackBuilderFactory().addValue({ name: variableName }))
            .setValue(typeScriptPrimitiveValueBuilderFactory().setNumberValue(1))
            .setMathOperator(TypeScriptMathOperator.ADD)
        )
    )
  }

  generateLoopWhile({ node, builder, clusterContent }: TypeScriptApiState) {
    const { typeScriptClusterBranchGenerator } = this.dependencies
    const { controls } = node

    const loopPath = findControlBySourceId<ClusterNodeControlOutputFlowDto>({
      controls,
      sourceId: 'body'
    })

    if (!loopPath) return

    const functionality = typeScriptClusterBranchGenerator.generateBranch(
      clusterContent.getFunctionalityBranch(node.id, loopPath.sourceId),
      clusterContent
    )

    builder.addCodeStatement(
      typeScriptWhileLoopBuilderFactory()
        .setFunctionality(functionality)
        .setExpression(typeScriptPrimitiveValueBuilderFactory().setBooleanValue(true))
    )
  }

  generateLoopDoWhile({ node, builder, clusterContent }: TypeScriptApiState) {
    const { typeScriptClusterBranchGenerator } = this.dependencies
    const { controls } = node

    const loopPath = findControlBySourceId<ClusterNodeControlOutputFlowDto>({
      controls,
      sourceId: 'body'
    })

    if (!loopPath) return

    const functionality = typeScriptClusterBranchGenerator.generateBranch(
      clusterContent.getFunctionalityBranch(node.id, loopPath.sourceId),
      clusterContent
    )

    builder.addCodeStatement(
      typeScriptDoWhileLoopBuilderFactory()
        .setFunctionality(functionality)
        .setExpression(typeScriptPrimitiveValueBuilderFactory().setBooleanValue(true))
    )
  }

  generateLoopInfinite({ node, builder, clusterContent }: TypeScriptApiState) {
    const { typeScriptClusterBranchGenerator } = this.dependencies
    const { controls } = node

    const loopPath = findControlBySourceId<ClusterNodeControlOutputFlowDto>({
      controls,
      sourceId: 'body'
    })

    if (!loopPath) return

    const functionality = typeScriptClusterBranchGenerator.generateBranch(
      clusterContent.getFunctionalityBranch(node.id, loopPath.sourceId),
      clusterContent
    )

    builder.addCodeStatement(
      typeScriptWhileLoopBuilderFactory()
        .setFunctionality(functionality)
        .setExpression(typeScriptPrimitiveValueBuilderFactory().setBooleanValue(true))
    )
  }

  generateReferenceVariable(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    const { node } = state

    return typeScriptReferenceStackBuilderFactory().addValue({
      name: mapVariableReferenceToTypeScriptName(node.title)
    })
  }

  generateConditionalExpression(state: TypeScriptApiState): TypeScriptExpressionBuilder {
    const { typeScriptClusterExpressionGenerator } = this.dependencies

    return typescriptTernaryOperatorBuilderFactory()
      .setExpression(typeScriptClusterExpressionGenerator.generateExpression(state, 'expression'))
      .setTrueExpression(typeScriptClusterExpressionGenerator.generateExpression(state, 'true'))
      .setFalseExpression(typeScriptClusterExpressionGenerator.generateExpression(state, 'false'))
  }

  generateLoopBreak({ builder }: TypeScriptApiState) {
    return builder.addCodeStatement(typeScriptBreakBuilderFactory())
  }

  generateLoopContinue({ builder }: TypeScriptApiState) {
    return builder.addCodeStatement(typeScriptContinueBuilderFactory())
  }
}
