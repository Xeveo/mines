import React from "react";
import { useModals } from "../../context/modals";
import { Modal } from "../modal";

import { NewGameForm } from "./new-game-form";

export const NewGameModal: React.FC = () => {
  const { newGameModal } = useModals();

  return (
    <Modal isOpen={newGameModal.isOpen}>
      <NewGameForm onClose={newGameModal.close} />
    </Modal>
  );
};
