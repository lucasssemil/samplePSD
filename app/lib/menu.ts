export type Role = "user" | "supervisor" | "admin";

export type IconName =
  | "dashboard"
  | "training"
  | "lms"
  | "assessment"
  | "survey"
  | "employee"
  | "exit"
  | "report";

/** Every page in the app. Who may open one is decided by ROLE_MENUS below. */
export type MenuId =
  | "dashboard"
  | "training"
  | "survey"
  | "employee-training"
  | "lms"
  | "employee-master"
  | "assessment-master"
  | "assessment-360"
  | "employee-exit"
  | "employee-report";

export const MENU_ITEMS: Record<MenuId, { label: string; icon: IconName }> = {
  dashboard: { label: "Dashboard", icon: "dashboard" },
  training: { label: "Training", icon: "training" },
  survey: { label: "Employee Company Survey", icon: "survey" },
  "employee-training": { label: "Employee Training", icon: "training" },
  lms: { label: "LMS", icon: "lms" },
  "employee-master": { label: "Employee Master", icon: "employee" },
  "assessment-master": { label: "Assessment Master", icon: "assessment" },
  "assessment-360": { label: "360 Assessment", icon: "assessment" },
  "employee-exit": { label: "Employee Exit", icon: "exit" },
  "employee-report": { label: "Employee Report", icon: "report" },
};

/**
 * The menu each role gets, in sidebar order — the single source of truth.
 * The sidebar renders from it and the router guards against it, so adding an
 * id to a role's array is all it takes to give that role the page.
 * "divider" draws a separator line.
 */
export const ROLE_MENUS: Record<Role, (MenuId | "divider")[]> = {
  user: ["dashboard", "divider", "training", "divider", "survey"],

  supervisor: [
    "dashboard",
    "divider",
    "training",
    "survey",
    "divider",
    "employee-training",
    "assessment-360",
    "employee-exit",
  ],

  admin: [
    "dashboard",
    "divider",
    "employee-training",
    "lms",
    "divider",
    "employee-master",
    "assessment-master",
    "assessment-360",
    "survey",
    "employee-exit",
    "employee-report",
  ],
};

export const ROLE_LABEL: Record<Role, string> = {
  user: "User",
  supervisor: "Supervisor",
  admin: "Admin",
};

export const ROLE_SUBTITLE: Record<Role, string> = {
  user: "Employee workspace",
  supervisor: "Supervisor workspace",
  admin: "Admin workspace",
};

export type MenuEntry =
  | { kind: "divider"; id: string }
  | { kind: "item"; id: MenuId; label: string; icon: IconName };

export function menuForRole(role: Role): MenuEntry[] {
  return ROLE_MENUS[role].map((id, index) =>
    id === "divider"
      ? { kind: "divider" as const, id: `d${index}` }
      : { kind: "item" as const, id, ...MENU_ITEMS[id] }
  );
}

/** Whether a role may open a page. The router uses this as its guard. */
export function canAccess(role: Role, id: string) {
  return (ROLE_MENUS[role] as string[]).includes(id);
}
