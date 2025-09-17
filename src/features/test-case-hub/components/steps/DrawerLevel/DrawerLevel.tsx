import React from "react";
import { DrawerLevelProps } from "../../../types/drawer";

export const DrawerLevel: React.FC<DrawerLevelProps> = ({
  isOpen,
  onClose,
  title,
  children,
  level,
}) => {
  return (
    <div
      className={`drawer-level drawer-level-${level} ${isOpen ? "open" : "closed"}`}
    >
      <div className="drawer-level-header">
        <button onClick={onClose} className="back-button">
          ← Voltar
        </button>
        <h2>{title}</h2>
      </div>
      <div className="drawer-level-content">{children}</div>
    </div>
  );
};
