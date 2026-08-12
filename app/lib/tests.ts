export type TestStatus = "Published" | "Draft" | "Archived";

export type TestRow = {
  id: string;
  code: string;
  title: string;
  category: string;
  questions: number;
  duration: number;
  status: TestStatus;
  createdAt: string;
};

export const TEST_LIST: TestRow[] = [
  {
    id: "1",
    code: "TST-001",
    title: "Basic Food Safety & Hygiene",
    category: "Operational",
    questions: 25,
    duration: 30,
    status: "Published",
    createdAt: "02 Aug 2026",
  },
  {
    id: "2",
    code: "TST-002",
    title: "Customer Service Excellence",
    category: "Soft Skill",
    questions: 20,
    duration: 25,
    status: "Published",
    createdAt: "05 Aug 2026",
  },
  {
    id: "3",
    code: "TST-003",
    title: "Standard Operating Procedure Outlet",
    category: "Operational",
    questions: 30,
    duration: 45,
    status: "Draft",
    createdAt: "07 Aug 2026",
  },
  {
    id: "4",
    code: "TST-004",
    title: "Leadership Fundamental for Supervisor",
    category: "Leadership",
    questions: 18,
    duration: 40,
    status: "Published",
    createdAt: "09 Aug 2026",
  },
  {
    id: "5",
    code: "TST-005",
    title: "Occupational Health & Safety (K3)",
    category: "Compliance",
    questions: 22,
    duration: 30,
    status: "Draft",
    createdAt: "10 Aug 2026",
  },
  {
    id: "6",
    code: "TST-006",
    title: "Product Knowledge — Bakery Line",
    category: "Product",
    questions: 15,
    duration: 20,
    status: "Archived",
    createdAt: "11 Aug 2026",
  },
];

export const TEST_CATEGORIES = [
  "Operational",
  "Soft Skill",
  "Leadership",
  "Compliance",
  "Product",
];
