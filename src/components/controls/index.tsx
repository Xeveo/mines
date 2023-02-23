import { useModals } from "../../context/modals";
import { useKeyboardShortcut } from "../../utils/use-keyboard-shortcut";

import { containerClass } from "./styles.css";

export const Controls: React.FC = () => {
  const { newGameModal } = useModals();

  useKeyboardShortcut({ key: "n", onKeyDown: newGameModal.open });

  return (
    <div className={containerClass}>
      <button type="button" onClick={newGameModal.open}>
        New Game
      </button>
    </div>
  );
};
