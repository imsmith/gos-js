import React from "react";
import { Mark } from "../core/Mark.jsx";

/* Timeline (manual/06 · timeline). Events down a rule: severity-colored dot
 * (status glyph for ramp steps), muted time, title, optional body.
 * events: [{ id, time, severity?, title, body? }]  — newest first unless stated.
 */
const SEV = {
  critical: { c: "var(--status-critical)", on: "var(--on-status-critical)", glyph: "m-critical" },
  high:     { c: "var(--status-high)",     on: "var(--on-status-high)",     glyph: "m-high" },
  medium:   { c: "var(--status-medium)",   on: "var(--on-status-medium)",   glyph: "m-medium" },
  low:      { c: "var(--status-low)",      on: "var(--on-status-low)",      glyph: "m-low" },
  unknown:  { c: "var(--status-unknown)",  on: "var(--on-status-unknown)",  glyph: "m-unknown" },
};

export function Timeline({ events = [], className = "", ...rest }) {
  return (
    <ol className={`ds-timeline ${className}`.trim()} {...rest}>
      {events.map((e, i) => {
        const s = SEV[e.severity];
        return (
          <li key={e.id || i} className="ds-event">
            <span className="ds-event__dot" style={s ? { "--_c": s.c, "--_on": s.on } : undefined} aria-hidden="true">
              {s && <Mark name={s.glyph} size={10} />}
            </span>
            <div className="ds-event__time">{e.time}{e.severity && <span> · {e.severity.toUpperCase()}</span>}</div>
            <div className="ds-event__title">{e.title}</div>
            {e.body && <div className="ds-event__body">{e.body}</div>}
          </li>
        );
      })}
    </ol>
  );
}
