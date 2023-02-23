import { style } from "@vanilla-extract/css";

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
