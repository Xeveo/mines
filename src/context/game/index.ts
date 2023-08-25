import useLocalStorage from "@rehooks/local-storage";
import React from "react";
import { Cell } from "../../types";
import { createGenericContext } from "../../utils/general-context";
import { clone } from "../../utils/ts-utils";
import { useConfig } from "./use-config";
import { useGameState } from "./use-game-state";
import { useWinLoss } from "./use-win-loss";
import {
  createBoard,
  getCell,
  getNeighbors,
  placeMines,
  revealCell,
  revealNeighbors,
} from "./utils";

export const [GameProvider, useGameContext] = createGenericContext(() => {
  const { winCount, lossCount, recordWin, recordLoss } = useWinLoss();
  const { rowCount, columnCount, mineCount, setConfiguration } = useConfig();
  const [board, setBoard] = useLocalStorage(
    "board",
    createBoard(rowCount, columnCount),
  );

  const {
    startGame,
    winGame,
    loseGame,
    areMinesActive,
    isGameOver,
    activateMines,
  } = useGameState({
    onWin: recordWin,
    onLose: recordLoss,
  });

  const createGame = React.useCallback(
    ({
      rows,
      columns,
      mines,
    }: {
      rows: number;
      columns: number;
      mines: number;
    }) => {
      setConfiguration({ rows, columns, mines });
      setBoard(createBoard(rows, columns));
      startGame();
    },
    [setBoard, setConfiguration, startGame],
  );

  const checkNeighbors = React.useCallback(
    (cell: Cell) => {
      const flaggedNeighbors = getNeighbors(board, cell).filter(
        ({ isFlagged }) => isFlagged,
      );

      if (!cell.isRevealed || cell.adjacentMines !== flaggedNeighbors.length) {
        return;
      }

      const nextBoard = clone(board);

      revealNeighbors(nextBoard, cell, loseGame);
      setBoard(nextBoard);
    },
    [board, loseGame, setBoard],
  );

  const checkCell = React.useCallback(
    (cell: Cell) => {
      if (cell.isFlagged) {
        return;
      }

      const nextBoard = clone(board);
      const nextCell = getCell(nextBoard, cell.rowIndex, cell.columnIndex);

      if (!areMinesActive) {
        placeMines(nextBoard, nextCell, mineCount);
        activateMines();
      }

      revealCell(nextBoard, nextCell, loseGame);
      setBoard(nextBoard);
    },
    [activateMines, areMinesActive, board, loseGame, mineCount, setBoard],
  );

  const flagCell = React.useCallback(
    (cell: Cell) => {
      const nextBoard = clone(board);
      const nextCell = getCell(nextBoard, cell.rowIndex, cell.columnIndex);

      nextCell.isFlagged = !nextCell.isFlagged;

      setBoard(nextBoard);
    },
    [board, setBoard],
  );

  /** Win the game if all mines have been revealed */
  React.useEffect(() => {
    let unrevealedCount = 0;

    for (const cell of board.flat()) {
      if (!cell.isRevealed) {
        unrevealedCount += 1;
      }
    }

    if (unrevealedCount === mineCount && !isGameOver) {
      winGame();
    }
  }, [board, isGameOver, mineCount, winGame]);

  return {
    board,
    checkCell,
    checkNeighbors,
    columnCount,
    createGame,
    flagCell,
    isGameOver,
    lossCount,
    mineCount,
    rowCount,
    winCount,
  };
});
