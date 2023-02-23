import React from "react";
import { createGenericContext } from "../../utils/general-context";

const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    open,
    close,
  };
};

export const [ModalsProvider, useModals] = createGenericContext(() => ({
  newGameModal: useModal(),
}));
