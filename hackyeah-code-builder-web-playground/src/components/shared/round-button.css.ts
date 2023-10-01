import { style } from "@vanilla-extract/css";

export const roundButton = style({
  backgroundColor: "transparent",
  border: `2px dashed #727272`,
  borderRadius: "50%",
  color: "#c5c5c5",
  fontWeight: 500,
  cursor: "pointer",
  display: "flex",
  padding: "4px",
});
