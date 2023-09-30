import { v4 as uuid } from 'uuid'
import { ClusterDto, ClusterEdgeDto, ClusterNodeFunctionalityDto, ClusterNodeType } from '../models'

export const normalizeApplicationCluster = (cluster: ClusterDto) => {
  const { id, name, type, edges, nodes } = cluster

  const newEdges: ClusterEdgeDto[] = []
  const removeEdgeIds: string[] = []
  const normalizedNodes: ClusterNodeFunctionalityDto[] = []

  for (const node of nodes) {
    if (node.type === ClusterNodeType.PIPE) {
      const firstItem = node.items[0]
      const lastItem = node.items[node.items.length - 1]

      const pipeTargetEdge = edges.find((edge) => edge.target === node.id)
      const pipeSourceEdge = edges.find((edge) => edge.source === node.id)

      if (!pipeSourceEdge || !pipeTargetEdge) {
        throw new Error(`Pipe node with id: [${node.id}] is not fully connected`)
      }

      normalizedNodes.push(...node.items)

      removeEdgeIds.push(pipeTargetEdge.id, pipeSourceEdge.id)

      newEdges.push(
        {
          id: uuid(),
          source: pipeTargetEdge.source,
          sourceHandle: pipeTargetEdge.sourceHandle,
          target: firstItem.id,
          targetHandle: (firstItem.controls[0] as { targetId: string }).targetId
        },
        {
          id: uuid(),
          source: lastItem.id,
          sourceHandle: (lastItem.controls[0] as { sourceId: string }).sourceId,
          target: pipeSourceEdge.target,
          targetHandle: pipeSourceEdge.targetHandle
        }
      )

      if (node.items.length > 1) {
        for (let i = 0; i < node.items.length - 1; i++) {
          const currentItem = node.items[i]
          const nextItem = node.items[i + 1]

          newEdges.push({
            id: uuid(),
            source: currentItem.id,
            sourceHandle: (currentItem.controls[0] as { sourceId: string }).sourceId,
            target: nextItem.id,
            targetHandle: (nextItem.controls[0] as { targetId: string }).targetId
          })
        }
      }
    } else {
      normalizedNodes.push(node)
    }
  }

  const normalizedEdges: ClusterEdgeDto[] = [
    ...edges.filter((edge) => !removeEdgeIds.includes(edge.id)),
    ...newEdges
  ]

  return {
    id,
    name,
    type,
    edges: normalizedEdges,
    nodes: normalizedNodes
  }
}
