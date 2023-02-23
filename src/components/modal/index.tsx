import { containerClass, modalClass } from "./styles.css";

export const Modal: React.FC<React.PropsWithChildren<{ isOpen: boolean }>> = ({
  children,
  isOpen,
}) =>
  isOpen ? (
    <div className={containerClass}>
      <div className={modalClass}>{children}</div>
    </div>
  ) : null;
