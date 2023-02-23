import { style } from "@vanilla-extract/css";

export const containerClass = style({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

export const modalClass = style({
  display: "flex",
  flexBasis: 0,
  background: "#FFFFFF",
  padding: "1rem",
  border: "1px solid #DEDEDE",
  borderRadius: "0.5rem",
  boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.25)",
});
