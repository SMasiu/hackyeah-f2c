import { createElement, Fragment, memo } from "react";
import { Handle, Position } from "reactflow";
import { controlTypes } from "../../nodes";
import { ReactComponent as ArrowRightIcon } from "../../icons/arrow-right.svg";
import { ReactComponent as CubeIcon } from "../../icons/cube.svg";
import {
  flowHandleIcon,
  flowHandleSource,
  flowHandleTarget,
} from "../handle/handle.css";
import {
  functionalityNodeContainer,
  functionalityNodeControl,
  functionalityNodeHeader,
  functionalityNodeHeaderIcon,
  functionalityNodeHeaderRefConnector,
  functionalityNodeHeaderRefTitle,
} from "./functionality-node.css";
import { isEdgeConnectionValid } from "../validation/edge-connection.validation";

export const FunctionalityNode = memo((node: any) => {
  return (
    <div className={functionalityNodeContainer}>
      <div className={`${functionalityNodeHeader} custom-drag-handle`}>
        {node.data.ref && (
          <Fragment>
            <CubeIcon className={functionalityNodeHeaderIcon} />
            <span className={functionalityNodeHeaderRefTitle}>
              {node.data.ref.title}
            </span>
            <span className={functionalityNodeHeaderRefConnector}>.</span>
          </Fragment>
        )}
        {node.data.title}
        {node.data.targetFlow && (
          <Handle
            type="target"
            id="flow"
            position={Position.Left}
            className={flowHandleTarget}
            isConnectable={node.isConnectable}
            isValidConnection={isEdgeConnectionValid}
          >
            <ArrowRightIcon className={flowHandleIcon} />
          </Handle>
        )}
        {node.data.sourceFlow && (
          <Handle
            type="source"
            position={Position.Right}
            id="flow"
            className={flowHandleSource}
            isConnectable={node.isConnectable}
            isValidConnection={isEdgeConnectionValid}
          >
            <ArrowRightIcon className={flowHandleIcon} />
          </Handle>
        )}
      </div>
      {node.data.controls.map(
        (control: { type: keyof typeof controlTypes }, index: number) => (
          <div className={functionalityNodeControl} key={index}>
            {createElement(controlTypes[control.type] as any, {
              node,
              control,
              controlIndex: index,
            })}
          </div>
        )
      )}
    </div>
  );
});
