import { NodeList } from "../shared/node-list";
import ReactFlow, { Controls, Background, Panel } from "reactflow";
import { nodeTypes } from "../../nodes";
import { storeSelector, useStore } from "../../store/store";
import { shallow } from "zustand/shallow";
import { saveClusterData } from "../../store/cluster.data";
import { useMutation } from "@tanstack/react-query";
import {
  button,
  codeContent,
  codePanel,
  codePanelHeader,
} from "./playground.css";

export const Playground = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    storeSelector,
    shallow
  );

  const { data, mutate } = useMutation({
    mutationFn: () =>
      fetch("http://localhost:3000/generate", {
        method: "POST",
        body: saveClusterData(),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  });

  return (
    <div className="app__container">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        proOptions={{ hideAttribution: true }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top-left">
          <NodeList />
        </Panel>
        <Panel position="top-right">
          <div className={codePanel}>
            <div className={codePanelHeader}>
              <button className={button} onClick={() => mutate()}>
                Compile to code
              </button>
            </div>
            {data && (
              <div
                className={codeContent}
                dangerouslySetInnerHTML={{
                  __html: data.content,
                }}
              />
            )}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};
