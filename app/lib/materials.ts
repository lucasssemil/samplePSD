export type MaterialFile = {
  id: string;
  name: string;
  /** Size in bytes, as reported by the browser File object. */
  size: number;
  type: string;
  title: string;
  /** Test this material belongs to, or null when it stands alone. */
  testId: string | null;
  uploadedAt: string;
};

export const MATERIAL_FILES: MaterialFile[] = [
  {
    id: "m1",
    name: "modul-food-safety.pdf",
    size: 2_411_000,
    type: "application/pdf",
    title: "Modul Basic Food Safety & Hygiene",
    testId: "1",
    uploadedAt: "02 Agu 2026",
  },
  {
    id: "m2",
    name: "sop-outlet-2026.pdf",
    size: 1_180_000,
    type: "application/pdf",
    title: "SOP Outlet Revisi 2026",
    testId: "3",
    uploadedAt: "07 Agu 2026",
  },
  {
    id: "m3",
    name: "service-excellence.pptx",
    size: 5_640_000,
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    title: "Slide Customer Service Excellence",
    testId: "2",
    uploadedAt: "05 Agu 2026",
  },
  {
    id: "m4",
    name: "checklist-k3.docx",
    size: 320_000,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    title: "Checklist Harian K3",
    testId: null,
    uploadedAt: "10 Agu 2026",
  },
];

/** Accepted upload types, used by the file picker and the validation hint. */
export const ACCEPTED_FILES = ".pdf,.doc,.docx,.ppt,.pptx,.mp4";

/** 2411000 -> "2.4 MB". */
export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Short label for the file badge, derived from the extension. */
export function fileKind(name: string) {
  const ext = name.split(".").pop()?.toUpperCase() ?? "FILE";
  return ext.length > 4 ? "FILE" : ext;
}
