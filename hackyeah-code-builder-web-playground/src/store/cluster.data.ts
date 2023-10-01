import { v4 as uuid } from "uuid";
import flowNodes from "../../fixtures/schemas/flow-schema-nodes.json";
import logicNodes from "../../fixtures/schemas/logic-schema-nodes.json";
import numberNodes from "../../fixtures/schemas/number-schema-nodes.json";
import stringNodes from "../../fixtures/schemas/string-schema-nodes.json";
import charNodes from "../../fixtures/schemas/char-schema-nodes.json";
import booleanNodes from "../../fixtures/schemas/boolean-schema-nodes.json";
import mathNodes from "../../fixtures/schemas/math-schema-nodes.json";
import loggerNodes from "../../fixtures/schemas/logger-nodes.json";
import uuidNodes from "../../fixtures/schemas/uuid-schema-nodes.json";
import jsonNodes from "../../fixtures/schemas/json-schema-nodes.json";
import arrayNodes from "../../fixtures/schemas/array-schema-nodes.json";
import cluster from "../../fixtures/clusters/empty-cluster.json";
import { useStore } from "./store";
import { Cluster, SchemaNode } from "./data";

const schemaNodesMap: Record<string, SchemaNode> = Object.fromEntries(
  [
    ...flowNodes,
    ...logicNodes,
    ...numberNodes,
    ...stringNodes,
    ...charNodes,
    ...booleanNodes,
    ...mathNodes,
    ...loggerNodes,
    ...uuidNodes,
    ...jsonNodes,
    ...arrayNodes,
  ].map((node) => [node.id, node] as [string, SchemaNode])
);

export const initialNodes = (cluster as Cluster).nodes.map(
  (clusterNode: any) => {
    const schemaNode = schemaNodesMap[clusterNode.nodeSchemaId];

    switch (schemaNode.type) {
      case "functionalityNode": {
        return {
          id: clusterNode.id,
          position: clusterNode.position,
          type: schemaNode.type,
          dragHandle: ".custom-drag-handle",
          data: {
            nodeSchemaId: schemaNode.id,
            title: schemaNode.title,
            ref: schemaNode.ref,
            sourceFlow: schemaNode.sourceFlow || false,
            targetFlow: schemaNode.targetFlow || false,
            controls: schemaNode.controls || [],
          },
        };
      }
      case "pipeNode": {
        return {
          id: clusterNode.id,
          position: clusterNode.position,
          type: schemaNode.type,
          data: {
            nodeSchemaId: schemaNode.id,
            items:
              clusterNode.items?.map((item: any) => {
                const schemaNode = schemaNodesMap[item];

                return {
                  ...schemaNode,
                  id: uuid(),
                  nodeSchemaId: schemaNode.id,
                };
              }) || [],
          },
        };
      }
      case "referenceNode": {
        const title = clusterNode?.title || schemaNode.title;
        return {
          id: clusterNode.id,
          position: clusterNode.position,
          type: schemaNode.type,
          data: {
            nodeSchemaId: schemaNode.id,
            title,
            controls: [
              {
                type: "outputExpressionControl",
                sourceId: "ref",
                sourceLabel: title,
              },
            ],
          },
        };
      }
    }
  }
);

export const initialEdges = cluster.edges;

export const saveClusterData = () => {
  const { nodes, edges } = useStore.getState();

  return JSON.stringify({
    id: cluster.id,
    name: cluster.name,
    type: cluster.type,
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.type,
      ...node.data,
    })),
    edges,
  });
};
