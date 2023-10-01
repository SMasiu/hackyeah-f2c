import { Fragment } from "react";
import { Handle, Position } from "reactflow";
import { expressionHandleTarget } from "../handle/handle.css";
import { isEdgeConnectionValid } from "../validation/edge-connection.validation";
import { inputExpressionControl } from "./input-expression-control.css";

export const InputExpressionControl = ({ control }: any) => {
  return (
    <Fragment>
      <Handle
        type="target"
        position={Position.Left}
        id={control.targetId}
        className={expressionHandleTarget}
        isValidConnection={isEdgeConnectionValid}
        isConnectable={true}
        style={{ backgroundColor: control.targetColor }}
      />
      <p className={inputExpressionControl}>{control.label}</p>
    </Fragment>
  );
};
