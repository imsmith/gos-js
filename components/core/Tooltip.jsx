import React from "react";

/* Tooltip (manual/06 · tooltip). A caption bubble on an anchor with a dotted-
 * underline cue; shown on hover AND focus, hidden on blur or Escape. Never the
 * sole carrier of essential information. Show/hide is CSS; Escape sets
 * data-dismissed, cleared when the pointer leaves or focus moves away.
 */
export function Tooltip({ text, children, className = "", ...rest }) {
  const id = React.useId();
  const [dismissed, setDismissed] = React.useState(false);
  return (
    <span
      className={`ds-tip ${className}`.trim()}
      tabIndex={0}
      aria-describedby={id}
      data-dismissed={dismissed || undefined}
      onKeyDown={(e) => { if (e.key === "Escape") setDismissed(true); }}
      onMouseLeave={() => setDismissed(false)}
      onBlur={() => setDismissed(false)}
      {...rest}
    >
      {children}
      <span className="ds-tip__bubble" role="tooltip" id={id}>{text}</span>
    </span>
  );
}
