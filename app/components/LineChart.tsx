"use client";

export type Point = {
  key: string;
  label: string;
  value: number;
  tooltip: string;
};

type Props = {
  points: Point[];
  /** Fixed y-scale, so a single low month never looks like a cliff. */
  min?: number;
  max?: number;
};

const WIDTH = 720;
const HEIGHT = 260;
const PAD_LEFT = 42;
const PAD_RIGHT = 22;
const PAD_TOP = 20;
const PAD_BOTTOM = 34;

/**
 * Single-series line chart. One series means no legend is needed — the panel
 * title names it — and only the last point carries a direct value label.
 */
export function LineChart({ points, min = 0, max = 100 }: Props) {
  if (points.length === 0) {
    return (
      <p className="empty-text mb-0">
        No assessment submitted yet. Add one with the form above.
      </p>
    );
  }

  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const x = (index: number) =>
    points.length === 1
      ? PAD_LEFT + plotWidth / 2
      : PAD_LEFT + (index / (points.length - 1)) * plotWidth;

  const y = (value: number) =>
    PAD_TOP + plotHeight - ((value - min) / (max - min)) * plotHeight;

  const ticks = [0, 25, 50, 75, 100].filter(
    (tick) => tick >= min && tick <= max
  );

  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${x(index)} ${y(point.value)}`)
    .join(" ");

  const last = points[points.length - 1];

  return (
    <div className="line-wrap">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="line-svg"
        role="img"
        aria-label={points
          .map((point) => `${point.label}: ${point.value}`)
          .join(", ")}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={y(tick)}
              y2={y(tick)}
              className="line-grid"
            />
            <text x={PAD_LEFT - 10} y={y(tick) + 4} textAnchor="end" className="line-tick">
              {tick}
            </text>
          </g>
        ))}

        <path d={path} className="line-path" />

        {points.map((point, index) => (
          <g key={point.key}>
            <circle
              cx={x(index)}
              cy={y(point.value)}
              r="5.5"
              className="line-dot"
            >
              <title>{point.tooltip}</title>
            </circle>
            <text
              x={x(index)}
              y={HEIGHT - 12}
              textAnchor="middle"
              className="line-tick"
            >
              {point.label}
            </text>
          </g>
        ))}

        <text
          x={x(points.length - 1)}
          y={y(last.value) - 14}
          textAnchor="end"
          className="line-value"
        >
          {last.value}
        </text>
      </svg>
    </div>
  );
}
