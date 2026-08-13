"use client";

import Image from "next/image";

import { ROLE_LABEL, type Role } from "../lib/menu";
import { SwitchIcon, UserIcon } from "./icons";

type Props = {
  role: Role;
  onChangeRole: (role: Role) => void;
  onToggleSidebar: () => void;
  onHome: () => void;
};

const ROLE_NAME: Record<Role, string> = {
  user: "Rizky Ramadhan",
  supervisor: "Bagus Prakoso",
  admin: "Admin General Affairs",
};

export function Topbar({
  role,
  onChangeRole,
  onToggleSidebar,
  onHome,
}: Props) {
  return (
    <header className="topbar">
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn btn-link d-lg-none p-0 text-dark"
          onClick={onToggleSidebar}
          aria-label="Buka menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <button
          type="button"
          className="brand-home"
          onClick={onHome}
          aria-label="Ke dashboard"
        >
          <Image
            src="/logo.png"
            alt="Bon Ami"
            width={180}
            height={46}
            priority
            className="brand-logo"
          />
          <span className="brand-sub">Sistem Manajemen SDM</span>
        </button>
      </div>

      <div className="d-flex align-items-center gap-3">
        <label className="role-switch" htmlFor="role-select">
          <SwitchIcon />
          <span className="visually-hidden">Ganti peran</span>
          <select
            id="role-select"
            className="role-select"
            value={role}
            onChange={(event) => onChangeRole(event.target.value as Role)}
          >
            {(["user", "supervisor", "admin"] as Role[]).map((option) => (
              <option key={option} value={option}>
                {ROLE_LABEL[option]}
              </option>
            ))}
          </select>
        </label>

        <div className="text-end d-none d-sm-block">
          <div className="topbar-user-name">{ROLE_NAME[role]}</div>
          <div className="topbar-user-status">{ROLE_LABEL[role]} &middot; Online</div>
        </div>

        <div className="avatar-circle">
          <UserIcon />
        </div>
      </div>
    </header>
  );
}
