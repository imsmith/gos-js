import React from "react";

/* Freshness (manual/06 · freshness indicator). A dot and a word — LIVE, PAUSED,
 * STALE, OFFLINE — plus the last-update timestamp. Live pulses (a live element
 * per the motion rules); the word is the signal, the dot the reinforcement.
 */
const WORD = { live: "LIVE", paused: "PAUSED", stale: "STALE", offline: "OFFLINE" };

export function Freshness({ state = "live", at, label, className = "", ...rest }) {
  return (
    <span className={`ds-fresh ds-fresh--${state} ${className}`.trim()} role="status" {...rest}>
      <span className="ds-fresh__dot" aria-hidden="true" />
      <span>{label || WORD[state] || state}</span>
      {at && <span className="ds-fresh__at">· {at}</span>}
    </span>
  );
}
