"use client";

import Image from "next/image";

import type { Role } from "../lib/menu";
import { SwitchIcon, UserIcon } from "./icons";

type Props = {
  role: Role;
  onToggleRole: () => void;
  onToggleSidebar: () => void;
};

export function Topbar({ role, onToggleRole, onToggleSidebar }: Props) {
  const isAdmin = role === "admin";

  return (
    <header className="topbar">
      <div className="d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn btn-link d-lg-none p-0 text-dark"
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <div>
          <Image
            src="/logo.png"
            alt="Bon Ami"
            width={180}
            height={46}
            priority
            className="brand-logo"
          />
          <div className="brand-sub">HR Management System</div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <button type="button" className="role-switch" onClick={onToggleRole}>
          <SwitchIcon />
          <span className="d-none d-sm-inline">
            Switch to {isAdmin ? "User" : "Admin"}
          </span>
          <span className="d-sm-none">Switch</span>
        </button>

        <div className="text-end d-none d-sm-block">
          <div className="topbar-user-name">
            {isAdmin ? "Admin General Affairs" : "Employee User"}
          </div>
          <div className="topbar-user-status">Online</div>
        </div>

        <div className="avatar-circle">
          <UserIcon />
        </div>
      </div>
    </header>
  );
}
