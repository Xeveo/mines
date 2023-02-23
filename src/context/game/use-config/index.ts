import useLocalStorage from "@rehooks/local-storage";
import React from "react";

export const useConfig = () => {
  const [rowCount, setRowCount] = useLocalStorage("rowCount", 20);
  const [columnCount, setColumnCount] = useLocalStorage("columnCount", 20);
  const [mineCount, setMineCount] = useLocalStorage("mineCount", 60);

  const setConfiguration = React.useCallback(
    ({
      rows,
      columns,
      mines,
    }: {
      rows: number;
      columns: number;
      mines: number;
    }) => {
      setRowCount(rows);
      setColumnCount(columns);
      setMineCount(mines);
    },
    [setColumnCount, setMineCount, setRowCount],
  );

  return {
    rowCount,
    columnCount,
    mineCount,
    setConfiguration,
  };
};
