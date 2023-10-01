import { Fragment } from "react";
import { Handle, Position } from "reactflow";
import {
  expressionHandleTarget,
  flowHandleIcon,
  flowHandleSource,
} from "../handle/handle.css";
import { ReactComponent as ArrowRightIcon } from "../../icons/arrow-right.svg";
import { expressionToFlowControl } from "./expression-to-flow-control.css";
import { isEdgeConnectionValid } from "../validation/edge-connection.validation";

export const ExpressionToFlowControl = ({ control }: any) => {
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
      <div className={expressionToFlowControl}>
        <span>{control.targetLabel}</span>
        <span>{control.sourceLabel}</span>
      </div>
    </Fragment>
  );
};
