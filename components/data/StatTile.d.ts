import React from "react";

/**
 * StatTile — label, big tabular value, unit, signed delta with diverging mark,
 * foot row for a Sparkline / StatusBadge.
 *
 * @startingPoint section="Data" subtitle="KPI tile" viewport="700x160"
 */
export interface StatTileProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  /** Signed change; renders m-warm / m-cool / m-neutral with the sign. */
  delta?: number;
  deltaUnit?: string;
  /** Status step coloring the value (outline treatment; dark surfaces only). */
  step?: "critical" | "high" | "medium" | "low" | "unknown";
  /** Foot row: Sparkline, StatusBadge, Tag. */
  children?: React.ReactNode;
}
export function StatTile(props: StatTileProps): JSX.Element;
