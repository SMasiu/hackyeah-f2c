import { globalStyle, style } from "@vanilla-extract/css";

export const booleanControl = style({
  display: "block",
  position: "relative",
  paddingLeft: "24px",
  cursor: "pointer",
  fontSize: "12px",
  userSelect: "none",
  lineHeight: "18px",
});

export const booleanControlInput = style({
  position: "absolute",
  opacity: "0",
  cursor: "pointer",
  height: "0",
  width: "0",
});

export const booleanControlCheckMark = style({
  position: "absolute",
  top: "0",
  left: "0",
  height: "14px",
  width: "14px",
  border: "1px solid #C4C4C4",
  borderRadius: "4px",
  backgroundColor: "transparent",
  "::after": {
    content: "",
    position: "absolute",
    display: "none",
    left: "5px",
    top: "2px",
    width: "3px",
    height: "7px",
    borderStyle: "solid",
    borderColor: "#fefefe",
    borderWidth: "0 2px 2px 0",
    transform: "rotate(45deg)",
  },
});

globalStyle(`${booleanControlInput}:checked ~ ${booleanControlCheckMark}`, {
  backgroundColor: "#6BABF5",
  borderColor: "#6BABF5",
});

globalStyle(
  `${booleanControlInput}:checked ~ ${booleanControlCheckMark}::after`,
  {
    borderColor: "#fefefe",
  }
);

globalStyle(
  `${booleanControlInput}:checked ~ ${booleanControlCheckMark}:after`,
  {
    display: "block",
  }
);
