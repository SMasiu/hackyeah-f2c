import { globalStyle } from "@vanilla-extract/css";
import { theme } from "./theme.css";

globalStyle("body", {
  background: theme.gridBackground,
  padding: "0",
  margin: "0",
  fontFamily: `"Poppins", sans-serif`,
});

globalStyle("input", {
  fontFamily: `"Poppins", sans-serif`,
});

globalStyle("button", {
  fontFamily: `"Poppins", sans-serif`,
});

globalStyle(".react-flow__background circle", {
  fill: theme.gridPatternColor,
});

globalStyle(".react-flow__controls-button", {
  background: theme.panelBackground,
  borderBottomColor: theme.panelBackground,
  fill: theme.panelColor,
});

globalStyle(".react-flow__controls-button:hover", {
  background: theme.panelActionBackground,
});

globalStyle(".react-flow__edge-path", {
  strokeWidth: "2px",
});

globalStyle(".app__container", {
  height: "100vh",
});
