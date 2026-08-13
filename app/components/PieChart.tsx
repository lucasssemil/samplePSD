"use client";

export type Slice = {
  key: string;
  label: string;
  value: number;
  color: string;
};

type Props = {
  slices: Slice[];
  centerValue: number;
  centerLabel: string;
};

const WIDTH = 240;
const HEIGHT = 220;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;
const RADIUS = 70;
const THICKNESS = 28;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** Surface-colored gap between neighbouring segments, in path units. */
const GAP = 3;

/**
 * Donut chart drawn with dash offsets, so each segment keeps a clean gap and
 * no path maths is needed. Percentages are labelled outside the ring and the
 * legend repeats every value, so the reading never depends on colour alone.
 */
export function PieChart({ slices, centerValue, centerLabel }: Props) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0);

  let offset = 0;
  const segments = slices
    .filter((slice) => slice.value > 0)
    .map((slice) => {
      const share = total === 0 ? 0 : slice.value / total;
      const length = share * CIRCUMFERENCE;
      const midAngle = ((offset + length / 2) / CIRCUMFERENCE) * 360 - 90;
      const segment = {
        ...slice,
        share,
        length,
        offset,
        midAngle,
      };
      offset += length;
      return segment;
    });

  return (
    <div className="pie-wrap">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="pie-svg"
        role="img"
        aria-label={`${centerLabel}: ${slices
          .map((slice) => `${slice.label} ${slice.value}`)
          .join(", ")}`}
      >
        <g transform={`rotate(-90 ${CX} ${CY})`}>
          <circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke="#f5eee5"
            strokeWidth={THICKNESS}
          />
          {segments.map((segment) => (
            <circle
              key={segment.key}
              cx={CX}
              cy={CY}
              r={RADIUS}
              fill="none"
              stroke={segment.color}
              strokeWidth={THICKNESS}
              strokeDasharray={`${Math.max(segment.length - GAP, 0)} ${
                CIRCUMFERENCE - Math.max(segment.length - GAP, 0)
              }`}
              strokeDashoffset={-segment.offset}
            >
              <title>{`${segment.label}: ${segment.value} (${Math.round(
                segment.share * 100
              )}%)`}</title>
            </circle>
          ))}
        </g>

        <text
          x={CX}
          y={CY - 4}
          textAnchor="middle"
          className="pie-center-value"
        >
          {centerValue}
        </text>
        <text
          x={CX}
          y={CY + 18}
          textAnchor="middle"
          className="pie-center-label"
        >
          {centerLabel}
        </text>

        {segments
          .filter((segment) => segment.share >= 0.08)
          .map((segment) => {
            const radians = (segment.midAngle * Math.PI) / 180;
            // Outside the ring, so the label never sits on a coloured fill.
            const labelRadius = RADIUS + THICKNESS / 2 + 13;
            return (
              <text
                key={`${segment.key}-label`}
                x={CX + Math.cos(radians) * labelRadius}
                y={CY + Math.sin(radians) * labelRadius + 4}
                textAnchor="middle"
                className="pie-slice-label"
              >
                {Math.round(segment.share * 100)}%
              </text>
            );
          })}
      </svg>
    </div>
  );
}
