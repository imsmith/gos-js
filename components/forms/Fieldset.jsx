import React from "react";

/* Fieldset — a group of fields under a caption legend with an optional hint
 * (manual/06 · fieldset). The form pattern's unit.
 */
export function Fieldset({ legend, hint, children, className = "", ...rest }) {
  return (
    <fieldset className={`ds-fieldset ${className}`.trim()} {...rest}>
      {legend && <legend className="ds-fieldset__legend">{legend}</legend>}
      {hint && <p className="ds-fieldset__hint">{hint}</p>}
      {children}
    </fieldset>
  );
}
