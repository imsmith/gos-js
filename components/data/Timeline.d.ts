import React from "react";

/** Timeline — events down a rule with severity dots; alert history, audit trails. */
export interface TimelineEvent {
  id?: string | number;
  time: React.ReactNode;
  severity?: "critical" | "high" | "medium" | "low" | "unknown";
  title: React.ReactNode;
  body?: React.ReactNode;
}
export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  events: TimelineEvent[];
}
export function Timeline(props: TimelineProps): JSX.Element;
