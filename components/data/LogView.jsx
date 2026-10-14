import React from "react";
import { Mark } from "../core/Mark.jsx";

/* LogView (manual/06 · log view). A bg well of monospaced lines: muted
 * timestamp, severity word + glyph, message. Follows the tail; scrolling up
 * pauses following and shows "PAUSED · n new" which resumes on click.
 * lines: [{ ts, severity, msg, id? }]
 */
const SEV = {
  critical: { c: "var(--status-critical)", on: "var(--on-status-critical)", glyph: "m-critical", word: "DOWN" },
  high:     { c: "var(--status-high)",     on: "var(--on-status-high)",     glyph: "m-high",     word: "ALERT" },
  medium:   { c: "var(--status-medium)",   on: "var(--on-status-medium)",   glyph: "m-medium",   word: "WARN" },
  low:      { c: "var(--status-low)",      on: "var(--on-status-low)",      glyph: "m-low",      word: "OK" },
  unknown:  { c: "var(--status-unknown)",  on: "var(--on-status-unknown)",  glyph: "m-unknown",  word: "UNK" },
  info:     { c: "var(--muted)",           on: "var(--bg)",                 glyph: "m-info",     word: "INFO" },
};

export function LogView({ lines = [], follow = true, height, className = "", ...rest }) {
  const ref = React.useRef(null);
  const [paused, setPaused] = React.useState(false);
  const [unseen, setUnseen] = React.useState(0);
  const atBottom = (el) => el.scrollHeight - el.scrollTop - el.clientHeight < 4;
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (follow && !paused) { el.scrollTop = el.scrollHeight; setUnseen(0); }
    else if (paused) setUnseen((n) => n + 1);
  }, [lines.length]);
  const onScroll = () => {
    const el = ref.current;
    if (atBottom(el)) { setPaused(false); setUnseen(0); } else if (follow) setPaused(true);
  };
  const resume = () => { const el = ref.current; el.scrollTop = el.scrollHeight; setPaused(false); setUnseen(0); };
  return (
    <div ref={ref} className={`ds-log ${className}`.trim()} style={height ? { "--_h": height } : undefined} role="log" aria-live="polite" onScroll={onScroll} {...rest}>
      {lines.map((l, i) => {
        const s = SEV[l.severity] || SEV.info;
        return (
          <div key={l.id || i} className={`ds-log__line${l.severity === "critical" ? " ds-log__line--critical" : ""}`}>
            <span className="ds-log__ts">{l.ts}</span>
            <span className="ds-log__sev" style={{ "--_c": s.c, "--_on": s.on }}><Mark name={s.glyph} size={12} />{s.word}</span>
            <span className="ds-log__msg">{l.msg}</span>
          </div>
        );
      })}
      {paused && <button type="button" className="ds-log__paused" onClick={resume}>Paused{unseen ? ` · ${unseen} new` : ""} ↓</button>}
    </div>
  );
}
