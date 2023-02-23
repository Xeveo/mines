import { AppProvider } from "../../context";
import { Board } from "../board";
import { Controls } from "../controls";
import { NewGameModal } from "../new-game-modal";
import { WinLoss } from "../win-loss";

import { containerClass, gameClass, headClass } from "./styles.css";

export const Game = () => (
  <AppProvider>
    <div className={containerClass}>
      <div className={gameClass}>
        <div className={headClass}>
          <Controls />
          <WinLoss />
        </div>
        <Board />
      </div>
    </div>
    <NewGameModal />
  </AppProvider>
);
