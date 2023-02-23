import useLocalStorage from "@rehooks/local-storage";
import React from "react";

export const useWinLoss = () => {
  const [winCount, setWins] = useLocalStorage<number>("win", 0);
  const [lossCount, setLosses] = useLocalStorage<number>("loss", 0);

  const win = React.useCallback(() => {
    setWins(winCount + 1);
  }, [setWins, winCount]);

  const lose = React.useCallback(() => {
    setLosses(lossCount + 1);
  }, [lossCount, setLosses]);

  return { lose, win, lossCount, winCount };
};
