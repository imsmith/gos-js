import React from "react";
import { Mark } from "../core/Mark.jsx";

/* Stepper (manual/06 · stepper). The wizard spine: numbered discs with
 * connectors; done = accent check, current = accent fill, blocked = critical.
 * steps: [{ id, label, state?: "done" | "current" | "upcoming" | "blocked" }]
 * or pass `current` (id) and let state derive by position.
 */
export function Stepper({ steps = [], current, className = "", ...rest }) {
  const ci = steps.findIndex((s) => s.id === current);
  return (
    <ol className={`ds-stepper ${className}`.trim()} {...rest}>
      {steps.map((s, i) => {
        const state = s.state || (ci < 0 ? "upcoming" : i < ci ? "done" : i === ci ? "current" : "upcoming");
        return (
          <React.Fragment key={s.id || i}>
            {i > 0 && <li className="ds-step__connector" role="presentation" />}
            <li className={`ds-step ds-step--${state}`} aria-current={state === "current" ? "step" : undefined}>
              <span className="ds-step__disc" aria-hidden="true">
                {state === "done" ? <Mark name="m-low" size={14} /> : state === "blocked" ? <Mark name="m-critical" size={14} /> : i + 1}
              </span>
              <span>{s.label}</span>
            </li>
          </React.Fragment>
        );
      })}
    </ol>
  );
}
