import { Fragment, memo } from "react";
import { Handle, Position } from "reactflow";
import {
  expressionHandleSource,
  expressionHandleTarget,
} from "../handle/handle.css";
import { RoundButton } from "../shared/round-button";
import { isEdgeConnectionValid } from "../validation/edge-connection.validation";
import {
  pipeNodeArrowIcon,
  pipeNodeContainer,
  pipeNodePlusButton,
} from "./pipe-node.css";
import { ReactComponent as PipeArrowRightIcon } from "../../icons/pipe-arrow-right.svg";

export const PipeNode = memo(({ data }: any) => {
  return (
    <div className={pipeNodeContainer}>
      {data.items.map((item: any, index: number) => (
        <Fragment key={item.id}>
          {!!index && <PipeArrowRightIcon className={pipeNodeArrowIcon} />}
          {item.title}
        </Fragment>
      ))}
      <RoundButton onClick={() => null} className={pipeNodePlusButton} />
      <Handle
        type="source"
        position={Position.Right}
        id="value"
        className={expressionHandleSource}
        style={{ backgroundColor: data.sourceColor }}
        isConnectable={true}
        isValidConnection={isEdgeConnectionValid}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="value"
        className={expressionHandleTarget}
        style={{ backgroundColor: data.targetColor }}
        isConnectable={true}
        isValidConnection={isEdgeConnectionValid}
      />
    </div>
  );
});
