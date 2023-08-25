import React from "react";
import { panic } from "../ts-utils";

export function createGenericContext<ContextProps, ContextValue>(
  useContextValue: (props: ContextProps) => ContextValue,
): [
  Provider: React.FC<React.PropsWithChildren<ContextProps>>,
  useContext: () => NonNullable<ContextValue>,
] {
  const context = React.createContext<ContextValue | undefined>(undefined);

  return [
    (props) => (
      <context.Provider value={useContextValue(props)}>
        {props.children}
      </context.Provider>
    ),
    () => React.useContext(context) ?? panic("Invalid use of context hook"),
  ];
}
