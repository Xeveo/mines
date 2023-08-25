import React from "react";

interface Shortcut {
  key: string;
  onKeyDown: () => void;
}

export const useKeyboardShortcut = ({ key, onKeyDown }: Shortcut): void => {
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        onKeyDown();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKeyDown, key]);
};
