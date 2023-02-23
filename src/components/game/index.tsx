import { GameProvider } from "../../context";
import { Board } from "../board";
import { NewGame } from "../new-game";
import { WinLoss } from "../win-loss";
import { containerClass, gameClass, headClass } from "./styles.css";

const rowCount = 20;
const columnCount = 20;
const mineCount = 60;

export const Game = () => (
  <GameProvider rowCount={rowCount} columnCount={columnCount} mineCount={mineCount}>
    <div className={containerClass}>
      <div className={gameClass}>
        <div className={headClass}>
          <NewGame />
          <WinLoss />
        </div>
        <Board />
      </div>
    </div>
  </GameProvider>
);
