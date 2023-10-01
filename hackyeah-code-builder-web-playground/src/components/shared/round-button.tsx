import { roundButton } from "./round-button.css";
import { ReactComponent as PlusIcon } from "../../icons/plus.svg";
import { MouseEvent } from "react";

export interface RoundButtonProps {
  onClick?: (e: MouseEvent) => void;
  className?: string;
}

export const RoundButton = ({ onClick, className }: RoundButtonProps) => {
  return (
    <button className={`${roundButton} ${className || ""}`} onClick={onClick}>
      <PlusIcon />
    </button>
  );
};
