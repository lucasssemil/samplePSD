export type SurveyCategory = "Safety" | "Assessment" | "Facility" | "Rules";

export const SURVEY_CATEGORIES: SurveyCategory[] = [
  "Safety",
  "Assessment",
  "Facility",
  "Rules",
];

export type SurveySentiment = "Positive" | "Negative";

export type SurveyEntry = {
  id: string;
  employeeId: string;
  category: SurveyCategory;
  sentiment: SurveySentiment;
  submittedAt: string;
  notes: string;
};

export const SURVEY_ENTRIES: SurveyEntry[] = [
  {
    id: "s1",
    employeeId: "e1",
    category: "Safety",
    sentiment: "Negative",
    submittedAt: "04 Aug 2026",
    notes:
      "Fire extinguisher near the frying station is past its inspection date. Please schedule a refill.",
  },
  {
    id: "s2",
    employeeId: "e1",
    category: "Facility",
    sentiment: "Negative",
    submittedAt: "06 Aug 2026",
    notes:
      "The crew locker room air conditioner has been leaking for two weeks. Floor gets slippery in the afternoon.",
  },
  {
    id: "s3",
    employeeId: "e2",
    category: "Assessment",
    sentiment: "Negative",
    submittedAt: "05 Aug 2026",
    notes:
      "Post-test questions felt much harder than the training video. Some topics were never covered in the material.",
  },
  {
    id: "s4",
    employeeId: "e2",
    category: "Rules",
    sentiment: "Negative",
    submittedAt: "08 Aug 2026",
    notes:
      "Shift swap rules are not clear. Different supervisors apply the H-2 approval differently between outlets.",
  },
  {
    id: "s5",
    employeeId: "e3",
    category: "Safety",
    sentiment: "Negative",
    submittedAt: "07 Aug 2026",
    notes:
      "Requesting anti-slip shoes for the dishwashing area. Two crew members slipped last month.",
  },
  {
    id: "s6",
    employeeId: "e4",
    category: "Facility",
    sentiment: "Negative",
    submittedAt: "09 Aug 2026",
    notes:
      "Cashier desk lighting is too dim during the evening shift, hard to check banknotes.",
  },
  {
    id: "s7",
    employeeId: "e4",
    category: "Assessment",
    sentiment: "Positive",
    submittedAt: "11 Aug 2026",
    notes:
      "Would prefer the pre-test to be available on mobile so it can be done before the shift starts.",
  },
  {
    id: "s8",
    employeeId: "e6",
    category: "Rules",
    sentiment: "Positive",
    submittedAt: "10 Aug 2026",
    notes:
      "Suggest publishing the updated leave policy on the portal — the printed copy on the board is outdated.",
  },
  {
    id: "s9",
    employeeId: "e6",
    category: "Safety",
    sentiment: "Negative",
    submittedAt: "12 Aug 2026",
    notes:
      "K3 briefing is only done for morning shift. Night shift crew never receives it.",
  },
  {
    id: "s10",
    employeeId: "e1",
    category: "Assessment",
    sentiment: "Positive",
    submittedAt: "13 Aug 2026",
    notes:
      "The new pre-test then video then post-test flow is clear. The video really helped before taking the post-test.",
  },
  {
    id: "s11",
    employeeId: "e3",
    category: "Facility",
    sentiment: "Positive",
    submittedAt: "13 Aug 2026",
    notes:
      "New crew room chairs and lockers at Outlet Bintaro are a big improvement, thank you.",
  },
  {
    id: "s12",
    employeeId: "e5",
    category: "Safety",
    sentiment: "Positive",
    submittedAt: "12 Aug 2026",
    notes:
      "Monthly safety briefing at Central Kitchen is consistent and easy to follow. Checklist on the wall helps.",
  },
];

export function surveysOf(employeeId: string) {
  return SURVEY_ENTRIES.filter((entry) => entry.employeeId === employeeId);
}

export function surveyCategoryClass(category: SurveyCategory) {
  if (category === "Safety") return "badge-status badge-failed";
  if (category === "Assessment") return "badge-status badge-published";
  if (category === "Facility") return "badge-status badge-draft";
  return "badge-status badge-required";
}
