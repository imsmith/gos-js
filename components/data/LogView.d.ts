import React from "react";

/**
 * LogView — tail-following monospaced log with severity glyph + word per line.
 *
 * @startingPoint section="Data" subtitle="Tail-following log" viewport="700x260"
 */
export interface LogLine {
  id?: string | number;
  ts: React.ReactNode;
  severity?: "critical" | "high" | "medium" | "low" | "unknown" | "info";
  msg: React.ReactNode;
}
export interface LogViewProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: LogLine[];
  /** Follow the tail (default true); scrolling up pauses, the affordance resumes. */
  follow?: boolean;
  /** CSS max-height (default 20rem). */
  height?: string;
}
export function LogView(props: LogViewProps): JSX.Element;
