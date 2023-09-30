import { normalizeApplicationCluster } from './application-cluster.normalizer'
import { ClusterDto, ClusterEdgeDto, ClusterNodeFunctionalityDto } from '../models'

const inputSchemaNodeId = 'flow:input:ref'
const flowHandleId = 'flow'

export class ApplicationClusterContent {
  private readonly nodes: ClusterNodeFunctionalityDto[]
  private readonly edges: ClusterEdgeDto[]

  private readonly nodeMap: Record<string, ClusterNodeFunctionalityDto>

  constructor(cluster: ClusterDto) {
    const { nodes, edges } = normalizeApplicationCluster(cluster)

    this.nodes = nodes
    this.edges = edges

    this.nodeMap = Object.fromEntries(nodes.map((node) => [node.id, node]))
  }

  getInputNode() {
    const node = this.nodes.find((node) => node.nodeSchemaId === inputSchemaNodeId)

    if (!node) {
      throw new Error(`Node with node schema id: [${inputSchemaNodeId}] not found`)
    }

    return node
  }

  getEdgeBySource(source: string, sourceHandle: string) {
    return this.edges.find((edge) => edge.source === source && edge.sourceHandle === sourceHandle)
  }

  getEdgeByTarget(target: string, targetHandle: string) {
    return this.edges.find((edge) => edge.target === target && edge.targetHandle === targetHandle)
  }

  getNextFlowNode(currentNodeId: string) {
    const node = this.nodeMap[currentNodeId]

    if (!node.sourceFlow) return null

    const flowEdge = this.getEdgeBySource(node.id, flowHandleId)

    if (!flowEdge) return null

    return this.nodeMap[flowEdge.target]
  }

  getPreviousExpressionNode(target: string, targetHandle: string) {
    const expressionEdge = this.getEdgeByTarget(target, targetHandle)

    if (!expressionEdge) return null

    return this.nodeMap[expressionEdge.source]
  }

  *getRootBranch() {
    let node: ClusterNodeFunctionalityDto | null = this.getInputNode()

    do {
      yield node as ClusterNodeFunctionalityDto

      node = node = this.getNextFlowNode(node.id)
    } while (node)
  }

  *getFunctionalityBranch(source: string, sourceHandle: string) {
    const edge = this.getEdgeBySource(source, sourceHandle)

    if (!edge) {
      throw new Error('Edge not found')
    }

    let node: ClusterNodeFunctionalityDto | null = this.nodeMap[edge.target]

    do {
      yield node as ClusterNodeFunctionalityDto

      node = this.getNextFlowNode(node.id)
    } while (node)
  }
}
