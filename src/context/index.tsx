import React from "react";
import { GameProvider } from "./game";
import { ModalsProvider } from "./modals";

export const AppProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <ModalsProvider>
    <GameProvider>{children}</GameProvider>
  </ModalsProvider>
);
