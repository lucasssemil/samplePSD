export type Role = "user" | "admin";

export type MenuEntry =
  | { kind: "divider"; id: string }
  | { kind: "item"; id: string; label: string; icon: IconName };

export type IconName =
  | "dashboard"
  | "training"
  | "lms"
  | "assessment"
  | "survey"
  | "employee"
  | "report";

export const USER_MENU: MenuEntry[] = [
  { kind: "item", id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { kind: "divider", id: "d1" },
  { kind: "item", id: "training", label: "Training", icon: "training" },
  { kind: "divider", id: "d2" },
  { kind: "item", id: "assessment", label: "360 Assessment", icon: "assessment" },
  {
    kind: "item",
    id: "survey",
    label: "Employee Company Survey",
    icon: "survey",
  },
];

export const ADMIN_MENU: MenuEntry[] = [
  { kind: "item", id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { kind: "divider", id: "d1" },
  {
    kind: "item",
    id: "employee-training",
    label: "Employee Training",
    icon: "training",
  },
  { kind: "item", id: "lms", label: "LMS", icon: "lms" },
  { kind: "divider", id: "d2" },
  {
    kind: "item",
    id: "employee-master",
    label: "Employee Master",
    icon: "employee",
  },
  { kind: "item", id: "assessment", label: "360 Assessment", icon: "assessment" },
  {
    kind: "item",
    id: "survey",
    label: "Employee Company Survey",
    icon: "survey",
  },
  {
    kind: "item",
    id: "employee-report",
    label: "Employee Report",
    icon: "report",
  },
];

export function menuForRole(role: Role): MenuEntry[] {
  return role === "admin" ? ADMIN_MENU : USER_MENU;
}
