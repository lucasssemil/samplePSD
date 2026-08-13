export type AttemptStatus = "Passed" | "Failed" | "In Progress" | "Not Started";

export type Attempt = {
  status: AttemptStatus;
  score: number | null;
  submittedAt: string | null;
};

export type AssignedTest = {
  id: string;
  testId: string;
  code: string;
  title: string;
  category: string;
  passingScore: number;
  required: boolean;
  trainingStart: string | null;
  trainingEnd: string | null;
  preTest: Attempt;
  postTest: Attempt;
};

export type EmployeeRow = {
  id: string;
  nik: string;
  name: string;
  position: string;
  department: string;
  outlet: string;
  joinedAt: string;
  /** ISO yyyy-mm-dd so it maps straight onto <input type="date">. */
  dateOfBirth: string;
  gender: "Male" | "Female";
  phone: string;
  email: string;
  address: string;
  /** Latest performance review score, 0-100. */
  kpiScore: number;
  assigned: AssignedTest[];
};

const notStarted: Attempt = {
  status: "Not Started",
  score: null,
  submittedAt: null,
};

export const EMPLOYEE_LIST: EmployeeRow[] = [
  {
    id: "e1",
    nik: "EMP-1001",
    name: "Rizky Ramadhan",
    position: "Crew Leader",
    department: "Operational",
    outlet: "Outlet Kemang",
    joinedAt: "12 Jan 2024",
    dateOfBirth: "1996-04-18",
    gender: "Male",
    phone: "0812-3345-7781",
    email: "rizky.ramadhan@example.com",
    address: "Jl. Kemang Raya No. 42, RT 03/RW 05, Bangka, Mampang Prapatan, Jakarta Selatan 12730",
    kpiScore: 82,
    assigned: [
      {
        id: "a1",
        testId: "1",
        code: "TST-001",
        title: "Basic Food Safety & Hygiene",
        category: "Operational",
        passingScore: 75,
        required: true,
        trainingStart: "01 Aug 2026",
        trainingEnd: "07 Aug 2026",
        preTest: { status: "Passed", score: 68, submittedAt: "01 Aug 2026" },
        postTest: { status: "Passed", score: 88, submittedAt: "07 Aug 2026" },
      },
      {
        id: "a2",
        testId: "2",
        code: "TST-002",
        title: "Customer Service Excellence",
        category: "Soft Skill",
        passingScore: 75,
        required: true,
        trainingStart: "10 Aug 2026",
        trainingEnd: "14 Aug 2026",
        preTest: { status: "Passed", score: 72, submittedAt: "10 Aug 2026" },
        postTest: { status: "In Progress", score: null, submittedAt: null },
      },
      {
        id: "a3",
        testId: "5",
        code: "TST-005",
        title: "Occupational Health & Safety (K3)",
        category: "Compliance",
        passingScore: 80,
        required: false,
        trainingStart: null,
        trainingEnd: null,
        preTest: notStarted,
        postTest: notStarted,
      },
      {
        id: "a9",
        testId: "6",
        code: "TST-006",
        title: "Product Knowledge — Bakery Line",
        category: "Product",
        passingScore: 70,
        required: false,
        trainingStart: "01 Jul 2026",
        trainingEnd: "08 Jul 2026",
        preTest: { status: "Passed", score: 70, submittedAt: "01 Jul 2026" },
        postTest: { status: "Passed", score: 85, submittedAt: "08 Jul 2026" },
      },
      {
        id: "a10",
        testId: "3",
        code: "TST-003",
        title: "Standard Operating Procedure Outlet",
        category: "Operational",
        passingScore: 75,
        required: true,
        trainingStart: "20 Jul 2026",
        trainingEnd: "26 Jul 2026",
        preTest: { status: "Passed", score: 66, submittedAt: "21 Jul 2026" },
        postTest: notStarted,
      },
    ],
  },
  {
    id: "e2",
    nik: "EMP-1002",
    name: "Siti Nurhaliza",
    position: "Barista",
    department: "Operational",
    outlet: "Outlet Senayan",
    joinedAt: "03 Mar 2024",
    dateOfBirth: "1999-11-02",
    gender: "Female",
    phone: "0857-9021-3344",
    email: "siti.nurhaliza@example.com",
    address: "Jl. Senayan Dalam No. 8, RT 01/RW 02, Selong, Kebayoran Baru, Jakarta Selatan 12110",
    kpiScore: 68,
    assigned: [
      {
        id: "a4",
        testId: "1",
        code: "TST-001",
        title: "Basic Food Safety & Hygiene",
        category: "Operational",
        passingScore: 75,
        required: true,
        trainingStart: "01 Aug 2026",
        trainingEnd: "07 Aug 2026",
        preTest: { status: "Failed", score: 54, submittedAt: "01 Aug 2026" },
        postTest: { status: "Passed", score: 79, submittedAt: "07 Aug 2026" },
      },
      {
        id: "a5",
        testId: "6",
        code: "TST-006",
        title: "Product Knowledge — Bakery Line",
        category: "Product",
        passingScore: 70,
        required: false,
        trainingStart: "12 Aug 2026",
        trainingEnd: "16 Aug 2026",
        preTest: { status: "In Progress", score: null, submittedAt: null },
        postTest: notStarted,
      },
    ],
  },
  {
    id: "e3",
    nik: "EMP-1003",
    name: "Bagus Prakoso",
    position: "Supervisor",
    department: "Operational",
    outlet: "Outlet Bintaro",
    joinedAt: "21 Sep 2023",
    dateOfBirth: "1991-06-27",
    gender: "Male",
    phone: "0821-4455-9080",
    email: "bagus.prakoso@example.com",
    address: "Jl. Bintaro Utama Sektor 3A No. 15, Pondok Karya, Pondok Aren, Tangerang Selatan 15225",
    kpiScore: 91,
    assigned: [
      {
        id: "a6",
        testId: "4",
        code: "TST-004",
        title: "Leadership Fundamental for Supervisor",
        category: "Leadership",
        passingScore: 75,
        required: true,
        trainingStart: "05 Aug 2026",
        trainingEnd: "12 Aug 2026",
        preTest: { status: "Passed", score: 76, submittedAt: "05 Aug 2026" },
        postTest: { status: "Passed", score: 92, submittedAt: "12 Aug 2026" },
      },
    ],
  },
  {
    id: "e4",
    nik: "EMP-1004",
    name: "Dewi Anggraini",
    position: "Cashier",
    department: "Finance",
    outlet: "Outlet Kemang",
    joinedAt: "07 Feb 2025",
    dateOfBirth: "2000-01-30",
    gender: "Female",
    phone: "0813-7788-2210",
    email: "dewi.anggraini@example.com",
    address: "Jl. Bangka II No. 27, RT 06/RW 04, Pela Mampang, Jakarta Selatan 12720",
    kpiScore: 74,
    assigned: [
      {
        id: "a7",
        testId: "2",
        code: "TST-002",
        title: "Customer Service Excellence",
        category: "Soft Skill",
        passingScore: 75,
        required: true,
        trainingStart: "10 Aug 2026",
        trainingEnd: "14 Aug 2026",
        preTest: { status: "Passed", score: 81, submittedAt: "10 Aug 2026" },
        postTest: notStarted,
      },
    ],
  },
  {
    id: "e5",
    nik: "EMP-1005",
    name: "Andi Kurniawan",
    position: "Warehouse Staff",
    department: "Supply Chain",
    outlet: "Central Kitchen",
    joinedAt: "18 Jun 2024",
    dateOfBirth: "1994-08-09",
    gender: "Male",
    phone: "0878-1122-6675",
    email: "andi.kurniawan@example.com",
    address: "Jl. Raya Cakung Cilincing KM 3, Rorotan, Cilincing, Jakarta Utara 14140",
    kpiScore: 55,
    assigned: [],
  },
  {
    id: "e6",
    nik: "EMP-1006",
    name: "Maria Tanjung",
    position: "HR Officer",
    department: "Human Capital",
    outlet: "Head Office",
    joinedAt: "29 Nov 2022",
    dateOfBirth: "1989-03-14",
    gender: "Female",
    phone: "0811-9034-5512",
    email: "maria.tanjung@example.com",
    address: "Jl. Tebet Barat Dalam Raya No. 61, RT 02/RW 07, Tebet, Jakarta Selatan 12810",
    kpiScore: 88,
    assigned: [
      {
        id: "a8",
        testId: "5",
        code: "TST-005",
        title: "Occupational Health & Safety (K3)",
        category: "Compliance",
        passingScore: 80,
        required: true,
        trainingStart: "03 Aug 2026",
        trainingEnd: "09 Aug 2026",
        preTest: { status: "Failed", score: 61, submittedAt: "03 Aug 2026" },
        postTest: { status: "Failed", score: 74, submittedAt: "09 Aug 2026" },
      },
    ],
  },
];

export const POSITIONS = [
  "Crew",
  "Crew Leader",
  "Barista",
  "Cashier",
  "Supervisor",
  "Warehouse Staff",
  "HR Officer",
];

export const DEPARTMENTS = [
  "Operational",
  "Finance",
  "Supply Chain",
  "Human Capital",
  "Marketing",
];

export const OUTLETS = [
  "Head Office",
  "Central Kitchen",
  "Outlet Kemang",
  "Outlet Senayan",
  "Outlet Bintaro",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "1996-04-18" -> "18 Apr 1996". Returns "—" for an empty value. */
export function formatIsoDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return "—";
  const [, year, month, day] = match;
  return `${day} ${MONTHS[Number(month) - 1]} ${year}`;
}

/** Whole years between the date of birth and today. */
export function ageFromIso(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [, year, month, day] = match.map(Number);
  const today = new Date();
  let age = today.getFullYear() - year;
  const beforeBirthday =
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day);
  if (beforeBirthday) age -= 1;
  return age;
}

export function attemptStatusClass(status: AttemptStatus) {
  if (status === "Passed") return "badge-status badge-published";
  if (status === "Failed") return "badge-status badge-failed";
  if (status === "In Progress") return "badge-status badge-draft";
  return "badge-status badge-archived";
}

export function completionOf(employee: EmployeeRow) {
  const total = employee.assigned.length;
  const done = employee.assigned.filter(
    (item) => item.postTest.status === "Passed" || item.postTest.status === "Failed"
  ).length;
  return { done, total };
}

export type KpiBand = "Green" | "Yellow" | "Red";

export const KPI_BANDS: { band: KpiBand; label: string; range: string }[] = [
  { band: "Green", label: "Green — On target", range: "80 and above" },
  { band: "Yellow", label: "Yellow — Needs attention", range: "65 to 79" },
  { band: "Red", label: "Red — Below standard", range: "under 65" },
];

export function kpiBand(score: number): KpiBand {
  if (score >= 80) return "Green";
  if (score >= 65) return "Yellow";
  return "Red";
}

export function kpiBandClass(band: KpiBand) {
  if (band === "Green") return "badge-status badge-published";
  if (band === "Yellow") return "badge-status badge-draft";
  return "badge-status badge-failed";
}

/** The employee whose account is signed in when the app runs as "user". */
export const CURRENT_EMPLOYEE_ID = "e1";

const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

/** Parses the display format used across the mock data ("07 Aug 2026"). */
export function parseDisplayDate(value: string) {
  const match = /^(\d{2}) ([A-Za-z]{3}) (\d{4})$/.exec(value);
  if (!match) return null;
  const month = MONTH_INDEX[match[2]];
  if (month === undefined) return null;
  return new Date(Number(match[3]), month, Number(match[1]));
}

export type TrainingState = "Active" | "Completed" | "Expired";

/**
 * A training is completed once the post-test has been submitted, expired when
 * its training window closed before that, and active otherwise.
 */
export function trainingState(item: AssignedTest, today = new Date()): TrainingState {
  const finished =
    item.postTest.status === "Passed" || item.postTest.status === "Failed";
  if (finished) return "Completed";
  const end = item.trainingEnd ? parseDisplayDate(item.trainingEnd) : null;
  if (end && end.getTime() < today.getTime()) return "Expired";
  return "Active";
}

export function trainingStateClass(state: TrainingState) {
  if (state === "Completed") return "badge-status badge-published";
  if (state === "Expired") return "badge-status badge-failed";
  return "badge-status badge-draft";
}
