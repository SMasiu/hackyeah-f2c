import { Fragment } from "react";
import { Handle, Position } from "reactflow";
import { storeUpdateControlDataSelector, useStore } from "../../store/store";
import {
  expressionHandleSource,
  expressionHandleTarget,
} from "../handle/handle.css";
import { isEdgeConnectionValid } from "../validation/edge-connection.validation";
import {
  textControl,
  textControlInput,
  textControlLabel,
} from "./text-control.css";

export const TextControl = ({ node, control, controlIndex }: any) => {
  const updateNodeControlData = useStore(storeUpdateControlDataSelector);

  return (
    <Fragment>
      {control.sourceId && (
        <Handle
          type="source"
          position={Position.Right}
          id={control.sourceId}
          className={expressionHandleSource}
          style={{ backgroundColor: control.sourceColor }}
          isValidConnection={isEdgeConnectionValid}
          isConnectable={true}
        />
      )}
      {control.targetId && (
        <Handle
          type="target"
          position={Position.Left}
          id={control.targetId}
          className={expressionHandleTarget}
          style={{ backgroundColor: control.targetColor }}
          isValidConnection={isEdgeConnectionValid}
          isConnectable={true}
        />
      )}
      <div className={textControl}>
        <span className={textControlLabel}>{control.label}</span>
        <input
          className={textControlInput}
          type="text"
          value={control.value || ""}
          onChange={(e) =>
            updateNodeControlData(node.id, controlIndex, {
              value: e.target.value,
            })
          }
        />
      </div>
    </Fragment>
  );
};
