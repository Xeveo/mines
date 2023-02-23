import { useGame } from "../../context";

export const NewGame: React.FC = () => {
  const { resetGame } = useGame();

  return (
    <button type="button" onClick={resetGame}>
      New Game
    </button>
  );
};
