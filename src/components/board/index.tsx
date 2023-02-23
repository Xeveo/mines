import { useGame } from "../../context";
import { GridCell } from "../cell";

import { boardClass } from "./styles.css";

export const Board = () => {
  const { board, rowCount, columnCount } = useGame();

  return (
    <div
      className={boardClass}
      style={{
        gridTemplateRows: `repeat(${rowCount}, auto)`,
        gridTemplateColumns: `repeat(${columnCount}, auto)`,
      }}
    >
      {board.map((row) => row.map((cell) => <GridCell cell={cell} key={cell.key} />))}
    </div>
  );
};
