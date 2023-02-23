import React from "react";
import ReactDOM from "react-dom/client";

import { Game } from "./components/game";
import { panic } from "./utils/ts-utils";

ReactDOM.createRoot(
  document.getElementById("root") ?? panic("Root element not found"),
).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
);
