import React from "react";

import type { Board, Cell } from "../types";
import { clone, panic } from "./ts-utils";
import { GameState, useGameState } from "./use-game-state";
import { useKeyboard } from "./use-keyboard";
import { useWinLoss } from "./use-win-loss";
import { createBoard, getCell, getSiblings, placeMines } from "./utils";

interface Props {
  rowCount: number;
  columnCount: number;
  mineCount: number;
}

export const useGameContext = ({ rowCount, columnCount, mineCount }: Props) => {
  const { lose, win, lossCount, winCount } = useWinLoss();
  const { endGame, isActive, isGameOver, setGameState } = useGameState();
  const [board, setBoard] = React.useState(() => createBoard(rowCount, columnCount));

  const revealSiblings = React.useCallback(
    (board: Board, cell: Cell) => {
      for (const sibling of getSiblings(board, cell)) {
        if (!sibling.isRevealed && !sibling.isFlagged) {
          sibling.isRevealed = true;

          if (sibling.isMine) {
            endGame(lose);
          } else if (sibling.adjacentMines === 0) {
            revealSiblings(board, sibling);
          }
        }
      }
    },
    [endGame, lose]
  );

  const resetGame = React.useCallback(() => {
    setBoard(createBoard(rowCount, columnCount));
    setGameState(GameState.Ready);
  }, [rowCount, columnCount, setGameState]);

  const checkCell = React.useCallback(
    ({ rowIndex, columnIndex, isFlagged }: Cell) => {
      if (isFlagged) {
        return;
      }

      setBoard((current) => {
        const next = clone(current);
        const cell = getCell(next, rowIndex, columnIndex);

        cell.isRevealed = true;

        if (!isActive) {
          placeMines(next, cell, mineCount);
          setGameState(GameState.Active);
        }

        if (cell.isMine) {
          endGame(lose);
        } else if (cell.adjacentMines === 0) {
          revealSiblings(next, cell);
        }

        return next;
      });
    },
    [endGame, isActive, lose, mineCount, revealSiblings, setGameState]
  );

  const flagCell = React.useCallback(({ rowIndex, columnIndex }: Cell) => {
    setBoard((current) => {
      const next = clone(current);
      const cell = getCell(next, rowIndex, columnIndex);

      cell.isFlagged = !cell.isFlagged;

      return next;
    });
  }, []);

  const checkSiblings = React.useCallback(
    (cell: Cell) => {
      setBoard((current) => {
        const flaggedSiblings = getSiblings(current, cell).filter(({ isFlagged }) => isFlagged);

        if (!cell.isRevealed || cell.adjacentMines !== flaggedSiblings.length) {
          return current;
        }

        const next = clone(current);

        revealSiblings(next, cell);

        return next;
      });
    },
    [revealSiblings]
  );

  React.useEffect(() => {
    let count = 0;

    for (const cell of board.flat()) {
      if (!cell.isRevealed) {
        count += 1;
      }
    }

    if (count === mineCount && !isGameOver) {
      endGame(win);
    }
  }, [board, endGame, isGameOver, mineCount, win]);

  useKeyboard({ resetGame });

  return {
    board,
    checkCell,
    checkSiblings,
    columnCount,
    flagCell,
    isGameOver,
    lossCount,
    resetGame,
    rowCount,
    winCount,
  };
};

const gameContext = React.createContext<ReturnType<typeof useGameContext> | undefined>(undefined);

export const GameProvider: React.FC<React.PropsWithChildren<Props>> = ({ children, ...props }) => (
  <gameContext.Provider value={useGameContext(props)}>{children}</gameContext.Provider>
);

export const useGame = () =>
  React.useContext(gameContext) ?? panic("You must use useGame within a descendent of GameProvider");
