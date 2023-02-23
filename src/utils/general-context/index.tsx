import React from "react";
import { panic } from "../ts-utils";

export function createGenericContext<ContextProps, ContextValue>(
  useContextValue: (props: ContextProps) => ContextValue,
) {
  const context = React.createContext<ContextValue | undefined>(undefined);
  const Provider: React.FC<React.PropsWithChildren<ContextProps>> = (props) => (
    <context.Provider value={useContextValue(props)}>
      {props.children}
    </context.Provider>
  );
  const useContext = () =>
    React.useContext(context) ?? panic("Invalid use of context hook");

  return [Provider, useContext] as const;
}
