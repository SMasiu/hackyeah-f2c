import { ChangeEvent, Fragment, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  nodeListItem,
  nodeListItemRef,
  nodeListWrapper,
  search,
} from "./node-list.css";

import flowNodes from "../../../fixtures/schemas/flow-schema-nodes.json";
import logicNodes from "../../../fixtures/schemas/logic-schema-nodes.json";
import numberNodes from "../../../fixtures/schemas/number-schema-nodes.json";
import stringNodes from "../../../fixtures/schemas/string-schema-nodes.json";
import charNodes from "../../../fixtures/schemas/char-schema-nodes.json";
import booleanNodes from "../../../fixtures/schemas/boolean-schema-nodes.json";
import mathNodes from "../../../fixtures/schemas/math-schema-nodes.json";
import loggerNodes from "../../../fixtures/schemas/logger-nodes.json";
import uuidNodes from "../../../fixtures/schemas/uuid-schema-nodes.json";
import jsonNodes from "../../../fixtures/schemas/json-schema-nodes.json";
import { storeAppendNodeSelector, useStore } from "../../store/store";

const allNodes = [
  ...flowNodes,
  ...loggerNodes,
  ...numberNodes,
  ...logicNodes,
  ...stringNodes,
  ...charNodes,
  ...booleanNodes,
  ...mathNodes,
  ...uuidNodes,
  ...jsonNodes,
].filter((node) => node.type === "functionalityNode");

export const NodeList = () => {
  const [nodes, setNodes] = useState(allNodes);
  const appendNode = useStore(storeAppendNodeSelector);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target.value || "").toLowerCase();

    if (!value) {
      setNodes(allNodes);
    } else {
      setNodes(
        allNodes.filter((item: any) => {
          const fullTitle = `${item.ref ? `${item.ref.title}.` : ""}${
            item.title
          }`;

          return (
            item.title.toLowerCase().startsWith(value) ||
            fullTitle.toLowerCase().startsWith(value)
          );
        })
      );
    }
  };

  const onClick = (schemaNode: any) => {
    appendNode({
      id: uuid(),
      position: {
        x: 0,
        y: 0,
      },
      type: schemaNode.type,
      dragHandle: ".custom-drag-handle",
      data: {
        nodeSchemaId: schemaNode.id,
        title: schemaNode.title,
        ref: schemaNode.ref,
        sourceFlow: schemaNode.sourceFlow || false,
        targetFlow: schemaNode.targetFlow || false,
        controls: structuredClone(schemaNode.controls) || [],
      },
    });
  };

  return (
    <div className={nodeListWrapper}>
      <input className={search} placeholder="search" onChange={onChange} />
      {nodes.map((node: any, index) => (
        <p key={index} className={nodeListItem} onClick={() => onClick(node)}>
          {node.ref && (
            <Fragment>
              <span className={nodeListItemRef}>{node.ref.title}</span>.
            </Fragment>
          )}
          {node.title}
        </p>
      ))}
    </div>
  );
};
