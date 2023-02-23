import React from "react";

export enum GameState {
  /** No mines have been placed and the user may act */
  Ready = "Ready",
  /** Mines have been placed and the user may act */
  Active = "Active",
  /** The game is over */
  Over = "Over",
}

export const useGameState = () => {
  const [gameState, setGameState] = React.useState<GameState>(GameState.Ready);
  const isActive = React.useMemo(() => gameState === GameState.Active, [gameState]);
  const isGameOver = React.useMemo(() => gameState === GameState.Over, [gameState]);

  const endGame = React.useCallback((onSuccess: () => void) => {
    setGameState((current) => {
      if (current === GameState.Over) {
        return current;
      }

      onSuccess();

      return GameState.Over;
    });
  }, []);

  return { endGame, isActive, isGameOver, setGameState };
};
