import { style } from "@vanilla-extract/css";
import { theme } from "../../styles/theme.css";

export const referenceNodeContainer = style({
  color: theme.nodeColor,
  boxShadow: theme.nodeShadow,
  backgroundColor: theme.referenceNodeBackground,
  borderRadius: "20px",
  padding: "4px 16px",
  fontSize: "12px",
});

export const referenceNodeHeaderIcon = style({
  width: "12px",
  marginBottom: "-2px",
  marginRight: "4px",
});
