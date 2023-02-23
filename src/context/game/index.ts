import useLocalStorage from "@rehooks/local-storage";
import React from "react";
import { Board, Cell } from "../../types";
import { createGenericContext } from "../../utils/general-context";
import { clone } from "../../utils/ts-utils";
import { useConfig } from "./use-config";
import { useGameState } from "./use-game-state";
import { useWinLoss } from "./use-win-loss";
import { createBoard, getCell, getSiblings, placeMines } from "./utils";

export const [GameProvider, useGame] = createGenericContext(() => {
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

  const revealSiblings = React.useCallback(
    (board: Board, cell: Cell) => {
      for (const sibling of getSiblings(board, cell)) {
        if (!sibling.isRevealed && !sibling.isFlagged) {
          sibling.isRevealed = true;

          if (sibling.isMine) {
            loseGame();
          } else if (sibling.adjacentMines === 0) {
            revealSiblings(board, sibling);
          }
        }
      }
    },
    [loseGame],
  );

  const checkCell = React.useCallback(
    ({ rowIndex, columnIndex, isFlagged }: Cell) => {
      if (isFlagged) {
        return;
      }

      const next = clone(board);
      const cell = getCell(next, rowIndex, columnIndex);
      cell.isRevealed = true;

      if (!areMinesActive) {
        placeMines(next, cell, mineCount);
        activateMines();
      }

      if (cell.isMine) {
        loseGame();
      } else if (cell.adjacentMines === 0) {
        revealSiblings(next, cell);
      }

      setBoard(next);
    },
    [
      board,
      areMinesActive,
      setBoard,
      mineCount,
      activateMines,
      loseGame,
      revealSiblings,
    ],
  );

  const flagCell = React.useCallback(
    ({ rowIndex, columnIndex }: Cell) => {
      const next = clone(board);
      const cell = getCell(next, rowIndex, columnIndex);

      cell.isFlagged = !cell.isFlagged;

      setBoard(next);
    },
    [board, setBoard],
  );

  const checkSiblings = React.useCallback(
    (cell: Cell) => {
      const flaggedSiblings = getSiblings(board, cell).filter(
        ({ isFlagged }) => isFlagged,
      );

      if (!cell.isRevealed || cell.adjacentMines !== flaggedSiblings.length) {
        return;
      }

      const next = clone(board);

      revealSiblings(next, cell);

      setBoard(next);
    },
    [board, revealSiblings, setBoard],
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
    checkSiblings,
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
