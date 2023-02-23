import type { Cell } from "../../../types";
import { useGame } from "../../../context";
import { ICON } from "../icons";

import { buttonClass } from "./styles.css";

const revealedContent = (cell: Cell) => {
  if (cell.isMine) {
    return ICON.BOOM;
  }

  if (cell.isFlagged) {
    return ICON.FLAG;
  }

  return cell.adjacentMines || null;
};

export const RevealedContent: React.FC<{ cell: Cell }> = ({ cell }) => {
  const { checkSiblings, isGameOver } = useGame();

  return (
    <button
      type="button"
      className={buttonClass}
      disabled={isGameOver}
      onContextMenu={(event) => {
        event.preventDefault();
        checkSiblings(cell);
      }}
    >
      {revealedContent(cell)}
    </button>
  );
};
