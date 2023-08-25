import React from "react";
import { useGameContext } from "../../../context/game";
import { useKeyboardShortcut } from "../../../utils/use-keyboard-shortcut";

import { buttonsClass, fieldsClass, formClass } from "./styles.css";

const NumberInput: React.FC<{
  id: string;
  onChange: (value: number) => void;
  value: number;
}> = ({ id, onChange, value }) => (
  <input
    id={id}
    type="number"
    pattern="^\d*$"
    onChange={(event) => {
      if (!event.target.validity.patternMismatch) {
        onChange(Number(event.target.value));
      }
    }}
    value={`${value}`}
  />
);

export const NewGameForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { createGame, rowCount, columnCount, mineCount } = useGameContext();
  const [rows, setRows] = React.useState(rowCount);
  const [columns, setColumns] = React.useState(columnCount);
  const [mines, setMines] = React.useState(mineCount);

  useKeyboardShortcut({ key: "Escape", onKeyDown: onClose });

  return (
    <form
      className={formClass}
      onSubmit={() => {
        createGame({ rows, columns, mines });
        onClose();
      }}
    >
      <div className={fieldsClass}>
        <label htmlFor="rows">Rows</label>
        <NumberInput id="rows" onChange={setRows} value={rows} />
        <label htmlFor="columns">Columns</label>
        <NumberInput id="columns" onChange={setColumns} value={columns} />
        <label htmlFor="mines">Mines</label>
        <NumberInput id="mines" onChange={setMines} value={mines} />
      </div>
      <div className={buttonsClass}>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit">New Game</button>
      </div>
    </form>
  );
};
