import React from "react";
import { Mark } from "../core/Mark.jsx";

/* StatTile (manual/06 · stat tile). Caption label, big tabular value + muted
 * unit, optional signed delta with a diverging mark, and a foot row for a
 * sparkline and/or status badge. A status `step` colors the value as an
 * outline on dark surfaces only (the stylesheet keeps it `text` on light).
 */
export function StatTile({ label, value, unit, delta, deltaUnit = "", step, children, className = "", ...rest }) {
  const d = delta == null ? null : Number(delta);
  const sign = d == null ? null : d > 0 ? "warm" : d < 0 ? "cool" : "neutral";
  return (
    <div className={`ds-stat ${className}`.trim()} data-step={step} style={step ? { "--_c": `var(--status-${step})` } : undefined} {...rest}>
      <div className="ds-stat__label">{label}</div>
      <div className="ds-stat__value">
        <span>{value}</span>
        {unit && <span className="ds-stat__unit">{unit}</span>}
        {d != null && (
          <span className="ds-stat__delta">
            <Mark name={`m-${sign}`} size={12} label={sign === "warm" ? "up" : sign === "cool" ? "down" : "unchanged"} />
            {sign === "cool" ? "−" : sign === "warm" ? "+" : "±"}{Math.abs(d)}{deltaUnit}
          </span>
        )}
      </div>
      {children && <div className="ds-stat__foot">{children}</div>}
    </div>
  );
}
