export type SurveyCategory =
  | "Keselamatan"
  | "Penilaian"
  | "Fasilitas"
  | "Peraturan";

export const SURVEY_CATEGORIES: SurveyCategory[] = [
  "Keselamatan",
  "Penilaian",
  "Fasilitas",
  "Peraturan",
];

export type SurveySentiment = "Positif" | "Negatif";

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
    category: "Keselamatan",
    sentiment: "Negatif",
    submittedAt: "04 Agu 2026",
    notes:
      "APAR dekat area penggorengan sudah lewat masa inspeksi. Mohon dijadwalkan isi ulang.",
  },
  {
    id: "s2",
    employeeId: "e1",
    category: "Fasilitas",
    sentiment: "Negatif",
    submittedAt: "06 Agu 2026",
    notes:
      "AC ruang loker crew bocor sudah dua minggu. Lantai jadi licin saat sore.",
  },
  {
    id: "s3",
    employeeId: "e2",
    category: "Penilaian",
    sentiment: "Negatif",
    submittedAt: "05 Agu 2026",
    notes:
      "Soal post-test terasa jauh lebih sulit daripada video pelatihan. Ada materi yang tidak pernah dibahas.",
  },
  {
    id: "s4",
    employeeId: "e2",
    category: "Peraturan",
    sentiment: "Negatif",
    submittedAt: "08 Agu 2026",
    notes:
      "Aturan tukar shift belum jelas. Tiap supervisor menerapkan persetujuan H-2 berbeda-beda antar outlet.",
  },
  {
    id: "s5",
    employeeId: "e3",
    category: "Keselamatan",
    sentiment: "Negatif",
    submittedAt: "07 Agu 2026",
    notes:
      "Mohon sepatu anti-slip untuk area cuci piring. Bulan lalu dua crew terpeleset.",
  },
  {
    id: "s6",
    employeeId: "e4",
    category: "Fasilitas",
    sentiment: "Negatif",
    submittedAt: "09 Agu 2026",
    notes:
      "Penerangan meja kasir terlalu redup saat shift malam, sulit memeriksa uang kertas.",
  },
  {
    id: "s7",
    employeeId: "e4",
    category: "Penilaian",
    sentiment: "Positif",
    submittedAt: "11 Agu 2026",
    notes:
      "Lebih enak kalau pre-test bisa dibuka di HP supaya bisa dikerjakan sebelum shift dimulai.",
  },
  {
    id: "s8",
    employeeId: "e6",
    category: "Peraturan",
    sentiment: "Positif",
    submittedAt: "10 Agu 2026",
    notes:
      "Usul agar kebijakan cuti terbaru diunggah ke portal — salinan cetak di papan sudah kedaluwarsa.",
  },
  {
    id: "s9",
    employeeId: "e6",
    category: "Keselamatan",
    sentiment: "Negatif",
    submittedAt: "12 Agu 2026",
    notes:
      "Briefing K3 hanya dilakukan untuk shift pagi. Crew shift malam tidak pernah mendapatkannya.",
  },
  {
    id: "s10",
    employeeId: "e1",
    category: "Penilaian",
    sentiment: "Positif",
    submittedAt: "13 Agu 2026",
    notes:
      "The new pre-test then video then post-test flow is clear. The video really helped before taking the post-test.",
  },
  {
    id: "s11",
    employeeId: "e3",
    category: "Fasilitas",
    sentiment: "Positif",
    submittedAt: "13 Agu 2026",
    notes:
      "New crew room chairs and lockers at Outlet Bintaro are a big improvement, thank you.",
  },
  {
    id: "s12",
    employeeId: "e5",
    category: "Keselamatan",
    sentiment: "Positif",
    submittedAt: "12 Agu 2026",
    notes:
      "Monthly safety briefing at Central Kitchen is consistent and easy to follow. Checklist on the wall helps.",
  },
];

export function surveysOf(employeeId: string) {
  return SURVEY_ENTRIES.filter((entry) => entry.employeeId === employeeId);
}

export function surveyCategoryClass(category: SurveyCategory) {
  if (category === "Keselamatan") return "badge-status badge-failed";
  if (category === "Penilaian") return "badge-status badge-published";
  if (category === "Fasilitas") return "badge-status badge-draft";
  return "badge-status badge-required";
}
