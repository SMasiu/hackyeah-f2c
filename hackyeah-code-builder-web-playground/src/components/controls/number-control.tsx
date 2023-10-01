import { Fragment } from "react";
import { Handle, Position } from "reactflow";
import { storeUpdateControlDataSelector, useStore } from "../../store/store";
import {
  expressionHandleSource,
  expressionHandleTarget,
} from "../handle/handle.css";
import { isEdgeConnectionValid } from "../validation/edge-connection.validation";
import {
  numberControl,
  numberControlInput,
  numberControlLabel,
} from "./number-control.css";

export const NumberControl = ({ node, control, controlIndex }: any) => {
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
      <div className={numberControl}>
        <span className={numberControlLabel}>{control.label}</span>
        <input
          className={numberControlInput}
          type="number"
          value={control.value ?? ""}
          onChange={(e) =>
            updateNodeControlData(node.id, controlIndex, {
              value: Number(e.target.value),
            })
          }
        />
      </div>
    </Fragment>
  );
};
