"use client";

import { menuForRole, type Role } from "../lib/menu";
import { Icon } from "./icons";

type Props = {
  role: Role;
  activeId: string;
  onSelect: (id: string) => void;
  open: boolean;
};

export function Sidebar({ role, activeId, onSelect, open }: Props) {
  const entries = menuForRole(role);

  return (
    <aside className={`sidebar${open ? " open" : ""}`}>
      <p className="sidebar-heading">Main Menu</p>

      <nav>
        {entries.map((entry) =>
          entry.kind === "divider" ? (
            <hr key={entry.id} className="sidebar-divider" />
          ) : (
            <button
              key={entry.id}
              type="button"
              className={`nav-item${entry.id === activeId ? " active" : ""}`}
              onClick={() => onSelect(entry.id)}
            >
              <Icon name={entry.icon} />
              <span>{entry.label}</span>
            </button>
          )
        )}
      </nav>
    </aside>
  );
}
