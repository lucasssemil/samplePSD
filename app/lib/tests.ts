export type TestStatus = "Published" | "Draft" | "Archived";

export type TestRow = {
  id: string;
  code: string;
  title: string;
  category: string;
  /** Every test must consist of a pre-test, a post-test and a video link. */
  preQuestions: number;
  postQuestions: number;
  videoLink: string;
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
    preQuestions: 10,
    postQuestions: 15,
    videoLink: "https://youtu.be/food-safety-101",
    duration: 30,
    status: "Published",
    createdAt: "02 Aug 2026",
  },
  {
    id: "2",
    code: "TST-002",
    title: "Customer Service Excellence",
    category: "Soft Skill",
    preQuestions: 8,
    postQuestions: 12,
    videoLink: "https://youtu.be/service-excellence",
    duration: 25,
    status: "Published",
    createdAt: "05 Aug 2026",
  },
  {
    id: "3",
    code: "TST-003",
    title: "Standard Operating Procedure Outlet",
    category: "Operational",
    preQuestions: 12,
    postQuestions: 18,
    videoLink: "https://youtu.be/sop-outlet",
    duration: 45,
    status: "Draft",
    createdAt: "07 Aug 2026",
  },
  {
    id: "4",
    code: "TST-004",
    title: "Leadership Fundamental for Supervisor",
    category: "Leadership",
    preQuestions: 8,
    postQuestions: 10,
    videoLink: "https://youtu.be/leadership-fundamental",
    duration: 40,
    status: "Published",
    createdAt: "09 Aug 2026",
  },
  {
    id: "5",
    code: "TST-005",
    title: "Occupational Health & Safety (K3)",
    category: "Compliance",
    preQuestions: 10,
    postQuestions: 12,
    videoLink: "https://youtu.be/k3-safety",
    duration: 30,
    status: "Draft",
    createdAt: "10 Aug 2026",
  },
  {
    id: "6",
    code: "TST-006",
    title: "Product Knowledge — Bakery Line",
    category: "Product",
    preQuestions: 6,
    postQuestions: 9,
    videoLink: "https://youtu.be/bakery-line",
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

export function totalQuestions(row: TestRow) {
  return row.preQuestions + row.postQuestions;
}
