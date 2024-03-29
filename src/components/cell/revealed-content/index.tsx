import { useGameContext } from "../../../context/game";
import type { Cell } from "../../../types";
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
  const { checkNeighbors, isGameOver } = useGameContext();

  return (
    <button
      type="button"
      className={buttonClass}
      disabled={isGameOver}
      onContextMenu={(event) => {
        event.preventDefault();
        checkNeighbors(cell);
      }}
    >
      {revealedContent(cell)}
    </button>
  );
};
