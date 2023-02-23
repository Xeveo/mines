import type { Cell } from "../../types";
import { HiddenContent } from "./hidden-content";
import { RevealedContent } from "./revealed-content";

import { cellClass } from "./styles.css";

export const GridCell: React.FC<{ cell: Cell }> = ({ cell }) => (
  <div className={cellClass}>{cell.isRevealed ? <RevealedContent cell={cell} /> : <HiddenContent cell={cell} />}</div>
);
