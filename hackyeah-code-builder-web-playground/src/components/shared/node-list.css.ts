import { style } from "@vanilla-extract/css";

export const nodeListWrapper = style({
  maxHeight: "500px",
  backgroundColor: "#3b3b3b",
  overflowX: "auto",
  borderRadius: "4px",
  boxShadow: "0 0 5px 0 #000000BF",
  scrollbarWidth: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

export const nodeListItem = style({
  color: "#fefefe",
  margin: "0",
  padding: "4px 10px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "12px",
  ":hover": {
    background: "#232323",
  },
});

export const nodeListItemRef = style({
  color: "#6BABF5",
  fontStyle: "italic",
});

export const search = style({
  background: "#3b3b3b",
  border: "none",
  padding: "0 10px",
  color: "#fefefe",
  fontSize: "12px",
  ":focus": {
    outline: "none",
  },
});
