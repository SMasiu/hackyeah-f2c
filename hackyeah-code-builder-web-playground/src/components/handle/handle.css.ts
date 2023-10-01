import { style } from "@vanilla-extract/css";
import { theme } from "../../styles/theme.css";

export const flowHandle = style({
  background: "transparent",
  border: "none",
  width: "16px",
  height: "16px",
});

export const flowHandleTarget = style([
  flowHandle,
  {
    left: "-8px",
  },
]);

export const flowHandleSource = style([
  flowHandle,
  {
    right: "-8px",
  },
]);

export const flowHandleIcon = style({
  pointerEvents: "none",
  display: "block",
  color: theme.flowHandleIconColor,
});

export const expressionHandle = style({
  background: theme.expressionHandleBackground,
  border: `2px solid ${theme.expressionHandleBorder}`,
  width: "8px",
  height: "8px",
});

export const expressionHandleTarget = style([
  expressionHandle,
  {
    left: "-6px",
  },
]);

export const expressionHandleSource = style([
  expressionHandle,
  {
    right: "-6px",
  },
]);
