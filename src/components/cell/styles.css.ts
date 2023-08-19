import { style } from "@vanilla-extract/css";

export const buttonClass = style({
  minWidth: "100%",
  minHeight: "100%",
  borderRadius: 0,
  lineHeight: "1.5em",
  border: "2px solid rgb(227, 227, 227)",
  borderInline: "2px outset rgb(227, 227, 227)",
  borderBlock: "2px outset rgb(227, 227, 227)",
  ":disabled": {
    color: "unset",
  },
});

export const cellClass = style({
  height: "2em",
  width: "2em",
});
