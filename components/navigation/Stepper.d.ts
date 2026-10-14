import React from "react";

/** Stepper — wizard steps: done (check), current (accent), upcoming, blocked (critical). */
export interface Step {
  id: string;
  label: React.ReactNode;
  state?: "done" | "current" | "upcoming" | "blocked";
}
export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: Step[];
  /** Current step id; states derive by position unless a step sets its own. */
  current?: string;
}
export function Stepper(props: StepperProps): JSX.Element;
