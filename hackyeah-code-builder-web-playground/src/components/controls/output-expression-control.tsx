import { Fragment } from "react";
import { Handle, Position } from "reactflow";
import { expressionHandleSource } from "../handle/handle.css";
import { isEdgeConnectionValid } from "../validation/edge-connection.validation";
import { outputExpressionControl } from "./output-expression-control.css";

export const OutputExpressionControl = ({ control }: any) => {
  return (
    <Fragment>
      <Handle
        type="source"
        position={Position.Right}
        id={control.sourceId}
        className={expressionHandleSource}
        style={{ backgroundColor: control.sourceColor }}
        isValidConnection={isEdgeConnectionValid}
        isConnectable={true}
      />
      <p className={outputExpressionControl}>{control.label}</p>
    </Fragment>
  );
};
