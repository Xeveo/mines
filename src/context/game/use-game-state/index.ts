import useLocalStorage from "@rehooks/local-storage";
import React from "react";

export enum GameState {
  /** No mines have been placed and the user may act */
  Ready = "Ready",
  /** Mines have been placed and the user may act */
  Active = "Active",
  /** The game is over */
  Over = "Over",
}

export const useGameState = ({
  onLose,
  onWin,
}: {
  onLose: () => void;
  onWin: () => void;
}) => {
  const [gameState, setGameState] = useLocalStorage<GameState>(
    "state",
    GameState.Ready,
  );

  const areMinesActive = React.useMemo(
    () => gameState === GameState.Active,
    [gameState],
  );

  const isGameOver = React.useMemo(
    () => gameState === GameState.Over,
    [gameState],
  );

  const startGame = React.useCallback(
    () => setGameState(GameState.Ready),
    [setGameState],
  );
  const activateMines = React.useCallback(
    () => setGameState(GameState.Active),
    [setGameState],
  );
  const endGame = React.useCallback(
    (onGameOver: () => void) => {
      if (gameState !== GameState.Over) {
        onGameOver();
      }

      setGameState(GameState.Over);
    },
    [gameState, setGameState],
  );

  const loseGame = React.useCallback(() => endGame(onLose), [endGame, onLose]);
  const winGame = React.useCallback(() => endGame(onWin), [endGame, onWin]);

  return {
    startGame,
    winGame,
    loseGame,
    areMinesActive,
    isGameOver,
    activateMines,
  };
};
