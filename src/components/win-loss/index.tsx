import { useGame } from "../../context";
import { containerClass } from "./styles.css";

export const WinLoss: React.FC = () => {
  const { winCount, lossCount } = useGame();

  return (
    <div className={containerClass}>
      <div>{`Wins: ${winCount.toLocaleString()}`}</div>
      <div>{`Losses: ${lossCount.toLocaleString()}`}</div>
    </div>
  );
};
