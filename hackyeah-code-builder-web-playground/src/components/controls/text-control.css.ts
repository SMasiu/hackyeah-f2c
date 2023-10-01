import { style } from "@vanilla-extract/css";
import { theme } from "../../styles/theme.css";

export const textControl = style({
  backgroundColor: theme.nodeInputBackground,
  border: `solid 1px rgb(40, 40, 40) ${theme.nodeInputBorder}`,
  padding: "2px 0",
  color: theme.nodeInputColor,
  fontSize: "12px",
  borderRadius: "4px",
  fontWeight: 300,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const textControlLabel = style({
  padding: "0 10px",
});

export const textControlInput = style({
  textAlign: "right",
  fontSize: "12px",
  padding: "0 10px 0 0",
  margin: "0",
  border: "none",
  backgroundColor: "transparent",
  color: theme.nodeInputColor,
  fontWeight: 500,
  maxWidth: "125px",
  ":focus": {
    outline: "none",
  },
  selectors: {
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: "0",
    },
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: "0",
    },
  },
});
