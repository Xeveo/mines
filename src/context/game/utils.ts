import type { Board, Cell } from "../../types";
import { defined, mapDefined } from "../../utils/ts-utils";

// prettier-ignore
const NEIGHBORS = [
  [-1,-1],[0,-1],[1,-1],
  [-1, 0],       [1, 0],
  [-1, 1],[0, 1],[1, 1],
] as const;

const dimensions = (
  board: Board,
): { rowCount: number; columnCount: number } => ({
  rowCount: board.length,
  columnCount: defined(board[0], "board has no rows").length,
});

export const getCell = (
  board: Board,
  rowIndex: number,
  columnIndex: number,
): Cell => defined(board[rowIndex]?.[columnIndex], "cell does not exist");

export const getNeighbors = (board: Board, cell: Cell): Cell[] =>
  mapDefined(NEIGHBORS, ([columnOffset, rowOffset]) => {
    const rowIndex = cell.rowIndex + rowOffset;
    const columnIndex = cell.columnIndex + columnOffset;

    return board[rowIndex]?.[columnIndex];
  });

export const revealCell = (board: Board, cell: Cell, loseGame: () => void) => {
  if (!cell.isRevealed && !cell.isFlagged) {
    cell.isRevealed = true;

    if (cell.isMine) {
      loseGame();
    } else if (cell.adjacentMines === 0) {
      revealNeighbors(board, cell, loseGame);
    }
  }
};

export const revealNeighbors = (
  board: Board,
  cell: Cell,
  loseGame: () => void,
) => {
  for (const neighbor of getNeighbors(board, cell)) {
    revealCell(board, neighbor, loseGame);
  }
};

const randomInt = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

const getRandomCell = (board: Board): Cell => {
  const { rowCount, columnCount } = dimensions(board);
  const rowIndex = randomInt(0, rowCount - 1);
  const columnIndex = randomInt(0, columnCount - 1);

  return getCell(board, rowIndex, columnIndex);
};

const getRandomSafeCell = (board: Board, safeCell: Cell): Cell => {
  const cell = getRandomCell(board);
  const isTooClose =
    Math.abs(safeCell.columnIndex - cell.columnIndex) <= 1 &&
    Math.abs(safeCell.rowIndex - cell.rowIndex) <= 1;

  if (isTooClose || cell.isMine) {
    return getRandomSafeCell(board, safeCell);
  }

  return cell;
};

export const placeMines = (
  board: Board,
  safeCell: Cell,
  mineCount: number,
): void => {
  for (let i = 0; i < mineCount; i++) {
    const cell = getRandomSafeCell(board, safeCell);

    cell.isMine = true;

    for (const neighbor of getNeighbors(board, cell)) {
      neighbor.adjacentMines += 1;
    }
  }
};

export const createBoard = (rowCount: number, columnCount: number): Board =>
  Array.from(Array(rowCount), (_, rowIndex) =>
    Array.from(
      Array(columnCount),
      (_, columnIndex): Cell => ({
        rowIndex,
        columnIndex,
        adjacentMines: 0,
        key: `${columnIndex}:${rowIndex}`,
      }),
    ),
  );
