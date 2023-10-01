import { Fragment } from "react";
import { Handle, Position } from "reactflow";
import { storeUpdateControlDataSelector, useStore } from "../../store/store";
import {
  expressionHandleSource,
  expressionHandleTarget,
} from "../handle/handle.css";
import { isEdgeConnectionValid } from "../validation/edge-connection.validation";
import {
  booleanControl,
  booleanControlCheckMark,
  booleanControlInput,
} from "./boolean-control.css";

export const BooleanControl = ({ node, control, controlIndex }: any) => {
  const updateNodeControlData = useStore(storeUpdateControlDataSelector);

  return (
    <Fragment>
      {control.sourceId && (
        <Handle
          type="source"
          position={Position.Right}
          id={control.sourceId}
          className={expressionHandleSource}
          isValidConnection={isEdgeConnectionValid}
          style={{ backgroundColor: control.sourceColor }}
          isConnectable={true}
        />
      )}
      {control.targetId && (
        <Handle
          type="target"
          position={Position.Left}
          id={control.targetId}
          className={expressionHandleTarget}
          isValidConnection={isEdgeConnectionValid}
          style={{ backgroundColor: control.targetColor }}
          isConnectable={true}
        />
      )}
      <label className={booleanControl}>
        {control.label}
        <input
          type="checkbox"
          className={booleanControlInput}
          checked={control.value ?? false}
          onChange={(e) =>
            updateNodeControlData(node.id, controlIndex, {
              value: e.target.checked,
            })
          }
        />
        <span className={booleanControlCheckMark}></span>
      </label>
    </Fragment>
  );
};
