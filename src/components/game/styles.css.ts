import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle("body", {
  fontFamily: "sans-serif",
  overflow: "auto",
});

export const containerClass = style({
  display: "flex",
  justifyContent: "center",
});

export const gameClass = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1em",
  paddingBottom: "1em",
  paddingTop: "1em",
});

export const headClass = style({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});
