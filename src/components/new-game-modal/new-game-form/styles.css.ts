import { style } from "@vanilla-extract/css";

export const formClass = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.7rem",
});

export const fieldsClass = style({
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
  gap: "0.5rem",
});

export const buttonsClass = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.5rem",
});
