import { style } from "@vanilla-extract/css";

import { buttonClass as baseButtonClass } from "../styles.css";

export const buttonClass = style([
  baseButtonClass,
  {
    background: "#FAFAFA",
    border: "unset",
  },
]);
