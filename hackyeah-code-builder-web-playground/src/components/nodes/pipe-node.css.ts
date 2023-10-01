import { style } from "@vanilla-extract/css";
import { theme } from "../../styles/theme.css";

export const pipeNodeContainer = style({
  display: "flex",
  alignItems: "center",
  color: theme.nodeColor,
  boxShadow: theme.nodeShadow,
  backgroundColor: theme.referenceNodeBackground,
  borderRadius: "20px",
  padding: "4px 16px",
  fontSize: "12px",
});

export const pipeNodeArrowIcon = style({
  margin: "0 8px",
});

export const pipeNodePlusButton = style({
  marginLeft: "8px",
});
