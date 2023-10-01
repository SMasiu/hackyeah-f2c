import { Fragment } from "react";
import { Handle, Position } from "reactflow";
import { flowHandleIcon, flowHandleSource } from "../handle/handle.css";
import { ReactComponent as ArrowRightIcon } from "../../icons/arrow-right.svg";
import { outputFlowControl } from "./output-flow-control.css";
import { isEdgeConnectionValid } from "../validation/edge-connection.validation";

export const OutputFlowControl = ({ control }: any) => {
  return (
    <Fragment>
      <Handle
        type="source"
        position={Position.Right}
        id={control.sourceId}
        className={flowHandleSource}
        isValidConnection={isEdgeConnectionValid}
        isConnectable={true}
      >
        <ArrowRightIcon
          className={flowHandleIcon}
          style={{ color: control.sourceColor }}
        />
      </Handle>
      <p className={outputFlowControl}>{control.label}</p>
    </Fragment>
  );
};
