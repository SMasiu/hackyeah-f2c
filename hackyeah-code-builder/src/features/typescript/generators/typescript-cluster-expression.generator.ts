import { TypeScriptClusterInputGenerator } from './typescript-cluster-input.generator'
import { getApiModuleFromClusterNode } from '../../../core'
import { TypeScriptExpressionBuilder } from '../../../languages/typescript'
import { TypeScriptApis, TypeScriptApiState } from '../apis/typescript.api'

export interface TypeScriptClusterExpressionGeneratorDependencies {
  typescriptApis: TypeScriptApis
  typeScriptClusterInputGenerator: TypeScriptClusterInputGenerator
}

export class TypeScriptClusterExpressionGenerator {
  constructor(private readonly dependencies: TypeScriptClusterExpressionGeneratorDependencies) {}

  generateExpression(state: TypeScriptApiState, targetId: string): TypeScriptExpressionBuilder {
    const { typescriptApis, typeScriptClusterInputGenerator } = this.dependencies
    const { node, clusterContent } = state

    const previousNode = clusterContent.getPreviousExpressionNode(node.id, targetId)

    if (previousNode) {
      const apiModule = getApiModuleFromClusterNode(previousNode)
      const api = typescriptApis[apiModule]

      return api.generateExpression({
        ...state,
        node: previousNode
      }) as TypeScriptExpressionBuilder
    }

    const expression = typeScriptClusterInputGenerator.generateExpressionByTargetId(node, targetId)

    if (!expression) {
      throw new Error(
        `Couldn't generate expression for node: [${node.id}] and targetId: [${targetId}]`
      )
    }

    return expression
  }
}
