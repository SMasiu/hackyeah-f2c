import { useUpdateNodeInternals } from "reactflow";
import { storeAppendNodeControlSelector, useStore } from "../../store/store";
import { RoundButton } from "../shared/round-button";
import { arrayNewItemControl } from "./array-new-item-control.css";

export const ArrayNewItemControl = ({ node, controlIndex }: any) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const appendNodeControl = useStore(storeAppendNodeControlSelector);

  return (
    <div className={arrayNewItemControl}>
      <RoundButton
        onClick={() => {
          appendNodeControl(node.id, controlIndex);
          updateNodeInternals(node.id);
        }}
      />
    </div>
  );
};
