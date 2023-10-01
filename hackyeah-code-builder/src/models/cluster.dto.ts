export enum ClusterType {
  FLOW = 'FLOW'
}

export enum ClusterNodeType {
  FUNCTIONALITY = 'functionalityNode',
  PIPE = 'pipeNode'
}

export enum ClusterNodeControlType {
  TEXT = 'textControl',
  NUMBER = 'numberControl',
  BOOLEAN = 'booleanControl',
  INPUT_EXPRESSION = 'inputExpressionControl',
  EXPRESSION_TO_FLOW = 'expressionToFlowControl',
  OUTPUT_FLOW = 'outputFlowControl'
}

export type ClusterNodeControlDtoItem<TType, TData> = { type: TType } & TData

export type ClusterNodeControlTextDto = ClusterNodeControlDtoItem<
  ClusterNodeControlType.TEXT,
  { targetId?: string; sourceId?: string; label: string; value: string }
>

export type ClusterNodeControlNumberDto = ClusterNodeControlDtoItem<
  ClusterNodeControlType.NUMBER,
  { targetId?: string; sourceId?: string; label: string; value: number }
>

export type ClusterNodeControlBooleanDto = ClusterNodeControlDtoItem<
  ClusterNodeControlType.BOOLEAN,
  { targetId?: string; sourceId?: string; label: string; value: boolean }
>

export type ClusterNodeControlInputExpressionDto = ClusterNodeControlDtoItem<
  ClusterNodeControlType.INPUT_EXPRESSION,
  { targetId: string; label: string }
>

export type ClusterNodeControlExpressionToFlowDto = ClusterNodeControlDtoItem<
  ClusterNodeControlType.EXPRESSION_TO_FLOW,
  {
    targetId: string
    targetLabel: string
    sourceId: string
    sourceLabel: string
  }
>

export type ClusterNodeControlOutputFlowDto = ClusterNodeControlDtoItem<
  ClusterNodeControlType.OUTPUT_FLOW,
  {
    sourceId: string
    sourceLabel: string
  }
>

export type ClusterNodeControlDto =
  | ClusterNodeControlTextDto
  | ClusterNodeControlNumberDto
  | ClusterNodeControlBooleanDto
  | ClusterNodeControlInputExpressionDto
  | ClusterNodeControlExpressionToFlowDto
  | ClusterNodeControlOutputFlowDto

export type ClusterNodeDtoItem<TType, TData> = {
  id: string
  nodeSchemaId: string
  type: TType
} & TData

export type ClusterNodeFunctionalityDto = ClusterNodeDtoItem<
  ClusterNodeType.FUNCTIONALITY,
  {
    title: string
    sourceFlow: boolean
    targetFlow: boolean
    controls: ClusterNodeControlDto[]
  }
>

export type ClusterNodePipeDto = ClusterNodeDtoItem<
  ClusterNodeType.PIPE,
  {
    items: ClusterNodeFunctionalityDto[]
  }
>

export type ClusterNodeDto = ClusterNodeFunctionalityDto | ClusterNodePipeDto

export interface ClusterEdgeDto {
  id: string
  source: string
  sourceHandle: string
  target: string
  targetHandle: string
}

export interface ClusterDto {
  id: string
  name: string
  type: ClusterType
  nodes: ClusterNodeDto[]
  edges: ClusterEdgeDto[]
}
