import React from "react";
import { Mark } from "../core/Mark.jsx";

/* Textarea — the Input at multi-line (manual/06 · textarea). Same label /
 * field / helper-or-error anatomy and states; vertical resize only.
 */
export function Textarea({ label, error, helper, id, rows = 4, className = "", ...rest }) {
  const fid = id || (label ? `ds-${String(label).replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const msg = error || helper;
  return (
    <div className={`ds-field${error ? " ds-field--error" : ""} ${className}`.trim()}>
      {label && <label className="ds-field__label" htmlFor={fid}>{label}</label>}
      <div className="ds-field__wrap">
        <textarea id={fid} rows={rows} className="ds-input ds-textarea" aria-invalid={error ? "true" : undefined} {...rest} />
      </div>
      {msg && (
        <div className="ds-field__msg">
          {error && <Mark name="m-critical" size={12} label="Error" />}
          <span>{msg}</span>
        </div>
      )}
    </div>
  );
}
