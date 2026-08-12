"use client";

import { useState } from "react";
import { LmsCreateTest } from "./components/LmsCreateTest";
import { LmsTestList } from "./components/LmsTestList";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { menuForRole, type Role } from "./lib/menu";

type View = "list" | "create-test";

export default function Home() {
  const [role, setRole] = useState<Role>("user");
  const [activeId, setActiveId] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<View>("list");

  function toggleRole() {
    const next: Role = role === "admin" ? "user" : "admin";
    setRole(next);
    setActiveId("dashboard");
    setView("list");
  }

  function selectMenu(id: string) {
    setActiveId(id);
    setSidebarOpen(false);
    setView("list");
  }

  const active = menuForRole(role).find(
    (entry) => entry.kind === "item" && entry.id === activeId
  );
  const title = active?.kind === "item" ? active.label : "Dashboard";

  const isLms = role === "admin" && activeId === "lms";

  return (
    <div className="app-shell">
      <Topbar
        role={role}
        onToggleRole={toggleRole}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <Sidebar
        role={role}
        activeId={activeId}
        onSelect={selectMenu}
        open={sidebarOpen}
      />

      <main className="content">
        {isLms ? (
          view === "create-test" ? (
            <LmsCreateTest onBack={() => setView("list")} />
          ) : (
            <LmsTestList onCreate={() => setView("create-test")} />
          )
        ) : (
          <>
            <div className="page-head">
              <div>
                <h1 className="page-title">{title}</h1>
                <p className="page-sub">
                  {role === "admin" ? "Admin workspace" : "Employee workspace"}
                </p>
              </div>
            </div>

            <section className="panel panel-empty">
              <div>
                <svg
                  width="54"
                  height="54"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d8c9b8"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18M8 13h8M8 16.5h5" />
                </svg>
                <p className="empty-title">Nothing here yet</p>
                <p className="empty-text">
                  This area is intentionally empty for the mockup.
                </p>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
