import { memo } from "react";
import { Handle, Position } from "reactflow";
import { expressionHandleSource } from "../handle/handle.css";
import { ReactComponent as CubeIcon } from "../../icons/cube.svg";
import {
  referenceNodeContainer,
  referenceNodeHeaderIcon,
} from "./reference-node.css";
import { isEdgeConnectionValid } from "../validation/edge-connection.validation";

export const ReferenceNode = memo(({ data }: any) => {
  return (
    <div className={referenceNodeContainer}>
      {/* load icon from url */}
      <CubeIcon className={referenceNodeHeaderIcon} />
      {data.title}
      <Handle
        type="source"
        position={Position.Right}
        id="ref"
        className={expressionHandleSource}
        style={{ backgroundColor: data.sourceColor }}
        isConnectable={true}
        isValidConnection={isEdgeConnectionValid}
      />
    </div>
  );
});
