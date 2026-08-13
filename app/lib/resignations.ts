export type ResignCategory =
  | "Ingin Pindah Kerja"
  | "Alasan Pribadi"
  | "Lainnya";

export const RESIGN_CATEGORIES: ResignCategory[] = [
  "Ingin Pindah Kerja",
  "Alasan Pribadi",
  "Lainnya",
];

export type ResignStatus = "Menunggu" | "Disetujui";

export type ResignLetter = {
  id: string;
  employeeId: string;
  category: ResignCategory;
  /** ISO yyyy-mm-dd — the intended last working day. */
  resignDate: string;
  reason: string;
  submittedAt: string;
  status: ResignStatus;
  /** Filled in by the admin when the letter is approved. */
  exitInterviewDate: string | null;
  onboardingPlanDate: string | null;
};

export const RESIGN_LETTERS: ResignLetter[] = [
  {
    id: "r1",
    employeeId: "e2",
    category: "Ingin Pindah Kerja",
    resignDate: "2026-09-15",
    reason:
      "Saya mendapat tawaran dari perusahaan lain dengan posisi yang lebih sesuai latar belakang studi saya.",
    submittedAt: "01 Agu 2026",
    status: "Menunggu",
    exitInterviewDate: null,
    onboardingPlanDate: null,
  },
  {
    id: "r2",
    employeeId: "e4",
    category: "Alasan Pribadi",
    resignDate: "2026-08-31",
    reason:
      "Pindah kembali ke kampung halaman untuk merawat orang tua. Terima kasih atas kesempatannya.",
    submittedAt: "28 Jul 2026",
    status: "Disetujui",
    exitInterviewDate: "2026-08-25",
    onboardingPlanDate: "2026-08-18",
  },
  {
    id: "r3",
    employeeId: "e5",
    category: "Ingin Pindah Kerja",
    resignDate: "2026-09-30",
    reason:
      "Menerima posisi supervisor gudang di perusahaan lain yang lebih dekat rumah.",
    submittedAt: "05 Agu 2026",
    status: "Menunggu",
    exitInterviewDate: null,
    onboardingPlanDate: null,
  },
  {
    id: "r4",
    employeeId: "e6",
    category: "Lainnya",
    resignDate: "2026-10-15",
    reason:
      "Melanjutkan studi S2 penuh waktu mulai Oktober ini.",
    submittedAt: "10 Agu 2026",
    status: "Menunggu",
    exitInterviewDate: null,
    onboardingPlanDate: null,
  },
];

export function resignCategoryClass(category: ResignCategory) {
  if (category === "Ingin Pindah Kerja") return "badge-status badge-draft";
  if (category === "Alasan Pribadi") return "badge-status badge-required";
  return "badge-status badge-archived";
}

export function resignStatusClass(status: ResignStatus) {
  return status === "Disetujui"
    ? "badge-status badge-published"
    : "badge-status badge-draft";
}

/**
 * Employees per resign category, most used first. Counts employees rather than
 * letters, so a person who submits twice is not double counted.
 */
export function categoryBreakdown(letters: ResignLetter[]) {
  return RESIGN_CATEGORIES.map((category) => ({
    category,
    employees: new Set(
      letters
        .filter((letter) => letter.category === category)
        .map((letter) => letter.employeeId)
    ).size,
  })).sort((a, b) => b.employees - a.employees);
}
