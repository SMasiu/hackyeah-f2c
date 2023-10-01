import { style } from "@vanilla-extract/css";

export const codePanel = style({
  height: "calc(100vh - 32px)",
  boxSizing: "border-box",
  minWidth: "500px",
  background: "#fefefe",
  padding: "32px",
  borderRadius: "8px",
});

export const codeContent = style({
  whiteSpace: "pre",
});

export const codePanelHeader = style({
  borderBottom: "1px solid #3b3b3b",
  paddingBottom: "16px",
  marginBottom: "16px",
});

export const button = style({
  backgroundColor: "#9397ff",
  color: "#fff",
  border: "none",
  width: "100%",
  padding: "8px",
  borderRadius: "8px",
  fontSize: "16px",
});
