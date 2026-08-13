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
  { key: "assignedTask", label: "Assigned Task", short: "Task" },
  { key: "satisfactoryUser", label: "Satisfactory User", short: "Satisfaction" },
  { key: "initiativePlan", label: "Initiative Plan", short: "Initiative" },
  { key: "disciplinary", label: "Disciplinary", short: "Discipline" },
  { key: "assessment", label: "Assessment", short: "Assessment" },
];

export type AssessmentScores = Record<AssessmentCategoryKey, number>;

export type AssessmentEntry = {
  id: string;
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

/** 360 assessments already submitted by the signed-in employee. */
export const ASSESSMENT_HISTORY: AssessmentEntry[] = [
  {
    id: "as1",
    month: "2026-03",
    scores: {
      assignedTask: 70,
      satisfactoryUser: 74,
      initiativePlan: 68,
      disciplinary: 76,
      assessment: 72,
    },
    score: 72,
    notes: "First quarter review. Feedback from two peers and one supervisor.",
    submittedAt: "02 Apr 2026",
  },
  {
    id: "as2",
    month: "2026-04",
    scores: {
      assignedTask: 78,
      satisfactoryUser: 74,
      initiativePlan: 72,
      disciplinary: 76,
      assessment: 75,
    },
    score: 75,
    notes: "Improved on shift handover checklist after coaching.",
    submittedAt: "03 May 2026",
  },
  {
    id: "as3",
    month: "2026-05",
    scores: {
      assignedTask: 68,
      satisfactoryUser: 72,
      initiativePlan: 70,
      disciplinary: 74,
      assessment: 71,
    },
    score: 71,
    notes: "Busy month, two peer reviews were submitted late.",
    submittedAt: "04 Jun 2026",
  },
  {
    id: "as4",
    month: "2026-06",
    scores: {
      assignedTask: 82,
      satisfactoryUser: 78,
      initiativePlan: 80,
      disciplinary: 79,
      assessment: 81,
    },
    score: 80,
    notes: "Led the new crew onboarding, scored well on teamwork.",
    submittedAt: "02 Jul 2026",
  },
  {
    id: "as5",
    month: "2026-07",
    scores: {
      assignedTask: 86,
      satisfactoryUser: 82,
      initiativePlan: 85,
      disciplinary: 83,
      assessment: 84,
    },
    score: 84,
    notes: "Strong result on service standard and initiative.",
    submittedAt: "03 Aug 2026",
  },
];

const MONTH_LABELS = [
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
