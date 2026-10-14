import React from "react";

/** Freshness — LIVE / PAUSED / STALE / OFFLINE word + dot + last-update time. */
export interface FreshnessProps extends React.HTMLAttributes<HTMLSpanElement> {
  state?: "live" | "paused" | "stale" | "offline";
  /** Last-update timestamp text (e.g. "02:14:31Z"). */
  at?: React.ReactNode;
  /** Override the word. */
  label?: React.ReactNode;
}
export function Freshness(props: FreshnessProps): JSX.Element;
