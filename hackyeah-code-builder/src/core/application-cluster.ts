import { ClusterNodeControlDto, ClusterNodeDto } from '../models'

export const getApiModuleFromClusterNode = (node: ClusterNodeDto) => {
  return node.nodeSchemaId.split(':')[0]
}

export interface FindControlBySourceIdOptions {
  controls: ClusterNodeControlDto[]
  sourceId: string
}

export const findControlBySourceId = <T extends ClusterNodeControlDto>({
  controls,
  sourceId
}: FindControlBySourceIdOptions) => {
  return (
    controls.find(
      (control): control is T => 'sourceId' in control && control.sourceId === sourceId
    ) || null
  )
}

export interface FindControlsBySourceIdOptions {
  controls: ClusterNodeControlDto[]
  sourceId: string
}

export const findControlsBySourceId = <T extends ClusterNodeControlDto>({
  controls,
  sourceId
}: FindControlsBySourceIdOptions) => {
  return controls.filter(
    (control): control is T =>
      'sourceId' in control && (control.sourceId as string).startsWith(`${sourceId}.`)
  )
}

export interface FindControlByTargetIdOptions {
  controls: ClusterNodeControlDto[]
  targetId: string
}

export const findControlByTargetId = <T extends ClusterNodeControlDto>({
  controls,
  targetId
}: FindControlByTargetIdOptions) => {
  return (
    controls.find(
      (control): control is T => 'targetId' in control && control.targetId === targetId
    ) || null
  )
}

export interface FindControlsByTargetIdOptions {
  controls: ClusterNodeControlDto[]
  targetId: string
}

export const findControlsByTargetId = <T extends ClusterNodeControlDto>({
  controls,
  targetId
}: FindControlsByTargetIdOptions) => {
  return controls.filter(
    (control): control is T =>
      'targetId' in control && (control.targetId as string).startsWith(`${targetId}.`)
  )
}
