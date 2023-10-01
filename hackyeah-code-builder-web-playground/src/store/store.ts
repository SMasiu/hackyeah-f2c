import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import { initialNodes, initialEdges } from "./cluster.data";

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNodeControlData: (
    nodeId: string,
    controlIndex: number,
    data: any
  ) => void;
  appendNodeControl: (nodeId: string, controlIndex: number) => void;
  appendNode: (node: Node) => void;
};

export const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  updateNodeControlData: (nodeId: string, controlIndex: number, data: any) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          console.log(node, node.id, nodeId);
          node.data.controls[controlIndex] = {
            ...node.data.controls[controlIndex],
            ...data,
          };

          node.data = { ...node.data };
        }

        return node;
      }),
    });
  },
  appendNodeControl: (nodeId: string, controlIndex: number) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          const previousControl = node.data.controls[controlIndex - 1];
          const currentControl = node.data.controls[controlIndex];

          const newControl = JSON.parse(JSON.stringify(previousControl));

          if (currentControl.incrementTargetId) {
            const [previousTargetId, previousTargetIndex] =
              previousControl.targetId.split(".");

            newControl.targetId = `${previousTargetId}.${
              Number(previousTargetIndex) + 1
            }`;
          }

          if (currentControl.incrementSourceId) {
            const [previousSourceId, previousSourceIndex] =
              previousControl.sourceId.split(".");

            newControl.sourceId = `${previousSourceId}.${
              Number(previousSourceIndex) + 1
            }`;
          }

          node.data.controls.splice(controlIndex, 0, newControl);

          node.data = { ...node.data };
        }

        return node;
      }),
    });
  },
  appendNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
}));

export const storeSelector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const storeUpdateControlDataSelector = (state: RFState) =>
  state.updateNodeControlData;

export const storeAppendNodeControlSelector = (state: RFState) =>
  state.appendNodeControl;

export const storeAppendNodeSelector = (state: RFState) => state.appendNode;
