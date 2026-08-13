import type { StaffLevel } from "./employees";

export type KpiMinimum = {
  level: StaffLevel;
  /** Minimum KPI score a staff member at this level must reach. */
  minScore: number;
  description: string;
};

export const KPI_MINIMUMS: KpiMinimum[] = [
  {
    level: "Karyawan",
    minScore: 65,
    description: "Crew, barista, kasir, staf gudang",
  },
  {
    level: "Senior",
    minScore: 70,
    description: "Crew leader dan staf senior",
  },
  {
    level: "Supervisor",
    minScore: 75,
    description: "Supervisor outlet dan shift leader",
  },
  {
    level: "Manager",
    minScore: 80,
    description: "Manager departemen dan area",
  },
  {
    level: "General Manager",
    minScore: 85,
    description: "General manager dan kepala divisi",
  },
];

export function minimumFor(minimums: KpiMinimum[], level: StaffLevel) {
  return minimums.find((item) => item.level === level)?.minScore ?? 0;
}
