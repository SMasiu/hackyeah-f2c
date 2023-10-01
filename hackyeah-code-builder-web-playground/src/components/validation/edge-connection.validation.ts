import { useStore } from "../../store/store";

const getSourceHandleTypeFromNode = (node: any, handle: string) => {
  if (handle === "flow") return "flow";

  if (!node.data.controls) return true;

  return (
    node.data.controls.find((control: any) => control.sourceId === handle)
      .sourceType || null
  );
};

const getTargetHandleTypeFromNode = (node: any, handle: string) => {
  if (handle === "flow") return "flow";

  if (!node.data.controls) return true;

  return (
    node.data.controls.find((control: any) => control.targetId === handle)
      .targetType || null
  );
};

export const isEdgeConnectionValid = (connection: any) => {
  const nodes = useStore.getState().nodes;

  const sourceNode = nodes.find((node) => node.id === connection.source);
  const targetNode = nodes.find((node) => node.id === connection.target);

  const sourceHandleType = getSourceHandleTypeFromNode(
    sourceNode,
    connection.sourceHandle
  );
  const targetHandleType = getTargetHandleTypeFromNode(
    targetNode,
    connection.targetHandle
  );

  if (!sourceHandleType || !targetHandleType) {
    return true;
  }

  return sourceHandleType === targetHandleType;
};
