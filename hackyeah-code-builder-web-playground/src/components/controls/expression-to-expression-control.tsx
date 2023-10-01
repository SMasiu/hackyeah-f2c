import { Fragment } from "react";
import { Handle, Position } from "reactflow";
import {
  expressionHandleSource,
  expressionHandleTarget,
} from "../handle/handle.css";
import { isEdgeConnectionValid } from "../validation/edge-connection.validation";
import { expressionToExpressionControl } from "./expression-to-expression-control.css";

export const ExpressionToExpressionControl = ({ control }: any) => {
  return (
    <Fragment>
      <Handle
        type="target"
        position={Position.Left}
        id={control.targetId}
        className={expressionHandleTarget}
        isValidConnection={isEdgeConnectionValid}
        style={{ backgroundColor: control.targetColor }}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={control.sourceId}
        className={expressionHandleSource}
        isValidConnection={isEdgeConnectionValid}
        style={{ backgroundColor: control.sourceColor }}
        isConnectable={true}
      />
      <div className={expressionToExpressionControl}>
        <span>{control.targetLabel}</span>
        <span>{control.sourceLabel}</span>
      </div>
    </Fragment>
  );
};
