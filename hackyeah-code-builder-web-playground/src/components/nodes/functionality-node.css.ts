import { style } from "@vanilla-extract/css";
import { theme } from "../../styles/theme.css";

export const functionalityNodeContainer = style({
  color: theme.nodeColor,
  boxShadow: theme.nodeShadow,
  backgroundColor: theme.functionalityNodeBackground,
  borderRadius: "5px",
  minWidth: "175px",
  paddingBottom: "4px",
});

export const functionalityNodeHeader = style({
  borderRadius: "5px 5px 0 0",
  padding: "4px 10px",
  backgroundColor: theme.functionalityNodeHeader,
  fontSize: "12px",
  position: "relative",
  marginBottom: "4px",
});

export const functionalityNodeHeaderIcon = style({
  width: "12px",
  marginBottom: "-2px",
  marginRight: "4px",
});

export const functionalityNodeHeaderRefTitle = style({
  fontStyle: "italic",
  color: theme.link,
});

export const functionalityNodeHeaderRefConnector = style({
  margin: "0 2px",
});

export const functionalityNodeControl = style({
  position: "relative",
  padding: "4px 10px",
  cursor: "default",
});
