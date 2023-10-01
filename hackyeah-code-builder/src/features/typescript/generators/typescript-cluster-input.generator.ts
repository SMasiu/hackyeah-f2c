import { findControlBySourceId, findControlByTargetId } from '../../../core'
import {
  TypeScriptExpressionBuilder,
  typeScriptPrimitiveValueBuilderFactory
} from '../../../languages/typescript'
import {
  ClusterNodeControlBooleanDto,
  ClusterNodeControlDto,
  ClusterNodeControlNumberDto,
  ClusterNodeControlTextDto,
  ClusterNodeControlType,
  ClusterNodeFunctionalityDto
} from '../../../models'

export class TypeScriptClusterInputGenerator {
  private inputToExpressionMap: Partial<
    Record<ClusterNodeControlType, (payload: ClusterNodeControlDto) => TypeScriptExpressionBuilder>
  > = {
    numberControl: (payload: ClusterNodeControlNumberDto) =>
      typeScriptPrimitiveValueBuilderFactory().setNumberValue(payload.value || 0),
    textControl: (payload: ClusterNodeControlTextDto) =>
      typeScriptPrimitiveValueBuilderFactory().setStringValue(payload.value || ''),
    booleanControl: (payload: ClusterNodeControlBooleanDto) =>
      typeScriptPrimitiveValueBuilderFactory().setBooleanValue(payload.value || false)
  }

  generateExpressionByTargetId(
    node: ClusterNodeFunctionalityDto,
    targetId: string
  ): TypeScriptExpressionBuilder | null {
    const control = findControlByTargetId({
      controls: node.controls,
      targetId
    })

    if (!control) return null

    return this.inputToExpressionMap[control.type]?.(control) || null
  }

  generateExpressionBySourceId(
    node: ClusterNodeFunctionalityDto,
    sourceId: string
  ): TypeScriptExpressionBuilder | null {
    const control = findControlBySourceId({
      controls: node.controls,
      sourceId
    })

    if (!control) return null

    return this.inputToExpressionMap[control.type]?.(control) || null
  }
}
