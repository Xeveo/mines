export interface Cell {
  key: string;
  columnIndex: number;
  rowIndex: number;
  isRevealed?: boolean;
  isMine?: boolean;
  isFlagged?: boolean;
  adjacentMines: number;
}

export type Board = ReadonlyArray<ReadonlyArray<Cell>>;
