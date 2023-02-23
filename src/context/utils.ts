import type { Board, Cell } from "../types";
import { defined, mapDefined } from "./ts-utils";

// prettier-ignore
const SIBLINGS = [
  [-1,-1],[0,-1],[1,-1],
  [-1, 0],       [1, 0],
  [-1, 1],[0, 1],[1, 1],
] as const;

const dimensions = (board: Board) => ({
  rowCount: board.length,
  columnCount: defined(board[0], "board has no dimensions").length,
});

export const getCell = (board: Board, rowIndex: number, columnIndex: number) =>
  defined(board[rowIndex]?.[columnIndex], "cell does not exist");

export const getSiblings = (board: Board, target: Cell) => {
  const { rowCount, columnCount } = dimensions(board);

  return mapDefined(SIBLINGS, ([columnOffset, rowOffset]) => {
    const rowIndex = target.rowIndex + rowOffset;
    const columnIndex = target.columnIndex + columnOffset;

    if (rowIndex >= 0 && rowIndex < rowCount && columnIndex >= 0 && columnIndex < columnCount) {
      return getCell(board, rowIndex, columnIndex);
    }
  });
};

const getRandomCell = (board: Board) => {
  const randomInt = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

  const { rowCount, columnCount } = dimensions(board);
  const rowIndex = randomInt(0, rowCount - 1);
  const columnIndex = randomInt(0, columnCount - 1);

  return getCell(board, rowIndex, columnIndex);
};

const placeMine = (board: Board, safeCell: Cell) => {
  const isUnsafe = ({ columnIndex, rowIndex }: Cell) =>
    Math.abs(safeCell.columnIndex - columnIndex) <= 1 && Math.abs(safeCell.rowIndex - rowIndex) <= 1;

  const cell = getRandomCell(board);

  if (cell.isMine || isUnsafe(cell)) {
    placeMine(board, safeCell);
  } else {
    cell.isMine = true;
  }
};

const setAdjacencies = (board: Board) => {
  for (const cell of board.flat()) {
    for (const adjacent of getSiblings(board, cell)) {
      if (adjacent.isMine) {
        cell.adjacentMines += 1;
      }
    }
  }
};

export const placeMines = (board: Board, safeCell: Cell, mineCount: number) => {
  for (let i = 0; i < mineCount; i++) {
    placeMine(board, safeCell);
  }

  setAdjacencies(board);
};

export const createBoard = (rowCount: number, columnCount: number): Board =>
  Array.from({ length: rowCount }, (_, rowIndex) =>
    Array.from(
      { length: columnCount },
      (_, columnIndex): Cell => ({
        rowIndex,
        columnIndex,
        adjacentMines: 0,
        key: `${columnIndex}:${rowIndex}`,
      })
    )
  );
