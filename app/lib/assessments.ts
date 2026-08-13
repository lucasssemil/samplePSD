export type AssessmentCategoryKey =
  | "assignedTask"
  | "satisfactoryUser"
  | "initiativePlan"
  | "disciplinary"
  | "assessment";

export const ASSESSMENT_CATEGORIES: {
  key: AssessmentCategoryKey;
  label: string;
  short: string;
}[] = [
  { key: "assignedTask", label: "Tugas yang Diberikan", short: "Tugas" },
  { key: "satisfactoryUser", label: "Kepuasan Pengguna", short: "Kepuasan" },
  { key: "initiativePlan", label: "Rencana Inisiatif", short: "Inisiatif" },
  { key: "disciplinary", label: "Kedisiplinan", short: "Disiplin" },
  { key: "assessment", label: "Penilaian", short: "Penilaian" },
];

export type AssessmentScores = Record<AssessmentCategoryKey, number>;

export type AssessmentEntry = {
  id: string;
  employeeId: string;
  /** yyyy-mm, so it maps straight onto <input type="month">. */
  month: string;
  scores: AssessmentScores;
  /** Average of the five category scores. */
  score: number;
  notes: string;
  submittedAt: string;
};

/** The KPI score for a month is the average of its five category scores. */
export function overallScore(scores: AssessmentScores) {
  const values = ASSESSMENT_CATEGORIES.map((category) => scores[category.key]);
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

/** Monthly reviews already recorded, across employees. */
export const REVIEW_HISTORY: AssessmentEntry[] = [
  {
    id: "as1",
    employeeId: "e1",
    month: "2026-03",
    scores: {
      assignedTask: 70,
      satisfactoryUser: 74,
      initiativePlan: 68,
      disciplinary: 76,
      assessment: 72,
    },
    score: 72,
    notes: "Review kuartal pertama. Masukan dari dua rekan kerja dan satu supervisor.",
    submittedAt: "02 Apr 2026",
  },
  {
    id: "as2",
    employeeId: "e1",
    month: "2026-04",
    scores: {
      assignedTask: 78,
      satisfactoryUser: 74,
      initiativePlan: 72,
      disciplinary: 76,
      assessment: 75,
    },
    score: 75,
    notes: "Ada perbaikan pada checklist serah terima shift setelah coaching.",
    submittedAt: "03 May 2026",
  },
  {
    id: "as3",
    employeeId: "e1",
    month: "2026-05",
    scores: {
      assignedTask: 68,
      satisfactoryUser: 72,
      initiativePlan: 70,
      disciplinary: 74,
      assessment: 71,
    },
    score: 71,
    notes: "Bulan yang padat, dua penilaian rekan kerja terlambat masuk.",
    submittedAt: "04 Jun 2026",
  },
  {
    id: "as4",
    employeeId: "e1",
    month: "2026-06",
    scores: {
      assignedTask: 82,
      satisfactoryUser: 78,
      initiativePlan: 80,
      disciplinary: 79,
      assessment: 81,
    },
    score: 80,
    notes: "Memimpin onboarding crew baru, nilai kerja sama tim bagus.",
    submittedAt: "02 Jul 2026",
  },
  {
    id: "as5",
    employeeId: "e1",
    month: "2026-07",
    scores: {
      assignedTask: 86,
      satisfactoryUser: 82,
      initiativePlan: 85,
      disciplinary: 83,
      assessment: 84,
    },
    score: 84,
    notes: "Hasil bagus pada standar layanan dan inisiatif.",
    submittedAt: "03 Agu 2026",
  },
  {
    id: "as6",
    employeeId: "e3",
    month: "2026-05",
    scores: {
      assignedTask: 88,
      satisfactoryUser: 90,
      initiativePlan: 86,
      disciplinary: 92,
      assessment: 89,
    },
    score: 89,
    notes: "Konsisten memimpin briefing pagi dan menjaga standar outlet.",
    submittedAt: "03 Jun 2026",
  },
  {
    id: "as7",
    employeeId: "e3",
    month: "2026-06",
    scores: {
      assignedTask: 90,
      satisfactoryUser: 92,
      initiativePlan: 88,
      disciplinary: 94,
      assessment: 91,
    },
    score: 91,
    notes: "Inisiatif membuat jadwal shift baru yang lebih rapi.",
    submittedAt: "02 Jul 2026",
  },
  {
    id: "as8",
    employeeId: "e6",
    month: "2026-06",
    scores: {
      assignedTask: 86,
      satisfactoryUser: 88,
      initiativePlan: 90,
      disciplinary: 88,
      assessment: 88,
    },
    score: 88,
    notes: "Menyelesaikan program rekrutmen crew baru tepat waktu.",
    submittedAt: "01 Jul 2026",
  },
];

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

/** "2026-07" -> "Jul 2026". */
export function formatMonth(month: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(month);
  if (!match) return month;
  return `${MONTH_LABELS[Number(match[2]) - 1]} ${match[1]}`;
}

/** "2026-07" -> "Jul", for compact axis ticks. */
export function shortMonth(month: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(month);
  if (!match) return month;
  return MONTH_LABELS[Number(match[2]) - 1];
}

export function reviewsOf(employeeId: string, entries: AssessmentEntry[]) {
  return entries
    .filter((entry) => entry.employeeId === employeeId)
    .sort((a, b) => a.month.localeCompare(b.month));
}
