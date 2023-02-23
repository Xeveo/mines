import { useGame } from "../../../context/game";
import type { Cell } from "../../../types";
import { ICON } from "../icons";

import { buttonClass } from "../styles.css";

const hiddenContent = (cell: Cell, isGameOver: boolean) => {
  if (isGameOver && cell.isMine) {
    return ICON.MINE;
  }

  if (cell.isFlagged) {
    return isGameOver ? ICON.MISS : ICON.FLAG;
  }

  return null;
};

export const HiddenContent: React.FC<{ cell: Cell }> = ({ cell }) => {
  const { checkCell, flagCell, isGameOver } = useGame();

  return (
    <button
      type="button"
      className={buttonClass}
      disabled={isGameOver}
      onClick={() => {
        checkCell(cell);
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        flagCell(cell);
      }}
    >
      {hiddenContent(cell, isGameOver)}
    </button>
  );
};
