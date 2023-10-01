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
import { SchemaNode } from "./data";

const schemaNodes: SchemaNode[][] = [
  flowNodes,
  logicNodes,
  numberNodes,
  stringNodes,
  charNodes,
  booleanNodes,
  mathNodes,
  loggerNodes,
  uuidNodes,
  jsonNodes,
  arrayNodes,
] as SchemaNode[][];

const schemaNodesGroups = Object.fromEntries(
  schemaNodes.map((schemaNode, index: number) => [
    schemaNode[0].id.split(":")[0],
    { count: 0, index },
  ])
);

const schemaNodesMap: Record<string, SchemaNode> = Object.fromEntries(
  schemaNodes.flat().map((node) => [node.id, node] as [string, SchemaNode])
);

export const initialNodes = schemaNodes.flat().map((schemaNode, nodeIndex) => {
  const group = schemaNode.id.split(":")[0];
  const { count, index } = schemaNodesGroups[group];

  const position = { x: index * 400, y: count * 200 };

  schemaNodesGroups[group].count += 1;

  switch (schemaNode.type) {
    case "functionalityNode": {
      return {
        id: (nodeIndex + 1).toString(),
        position,
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
        id: schemaNode.id,
        position,
        type: schemaNode.type,
        data: {
          nodeSchemaId: schemaNode.id,
          items: schemaNode.items.map((item) => {
            const schemaNode = schemaNodesMap[item];

            return {
              ...schemaNode,
              id: uuid(),
              nodeSchemaId: schemaNode.id,
            };
          }),
        },
      };
    }
    case "referenceNode": {
      return {
        id: schemaNode.id,
        position,
        type: schemaNode.type,
        data: {
          nodeSchemaId: schemaNode.id,
          title: schemaNode.title,
        },
      };
    }
  }
});

export const initialEdges = [];
