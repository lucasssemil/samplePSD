import type { IconName } from "../lib/menu";

type Props = {
  name: IconName;
  size?: number;
};

const PATHS: Record<IconName, React.ReactNode> = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="18" rx="1.5" />
      <rect x="14" y="3" width="7" height="8" rx="1.5" />
      <rect x="14" y="15" width="7" height="6" rx="1.5" />
    </>
  ),
  training: (
    <>
      <path d="M12 4 2 9l10 5 10-5-10-5Z" />
      <path d="M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
    </>
  ),
  lms: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13Z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13Z" />
    </>
  ),
  assessment: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v4.8l3.2 2" />
    </>
  ),
  survey: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8.5 8.5h7M8.5 12.5h7M8.5 16.5h4" />
    </>
  ),
  employee: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6" />
    </>
  ),
  report: (
    <>
      <path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13.5h6M9 17h4" />
    </>
  ),
};

export function Icon({ name, size = 19 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

export function SwitchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h14l-3.5-3.5M21 16H7l3.5 3.5" />
    </svg>
  );
}

export function UserIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M12 13.5c-4 0-7 2.3-7 5.2 0 .7.6 1.3 1.3 1.3h11.4c.7 0 1.3-.6 1.3-1.3 0-2.9-3-5.2-7-5.2Z" />
    </svg>
  );
}
