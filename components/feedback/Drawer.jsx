import React from "react";
import { Mark } from "../core/Mark.jsx";

/* Drawer (manual/06 · drawer). The modal anchored to an edge: scrim, full-height
 * surface panel (header · scrolling body · footer). Same behavior as Modal —
 * focus trapped and returned, Esc and scrim dismiss unless blocking.
 */
export function Drawer({ open, onClose, title, side = "right", width, blocking = false, children, footer, className = "", ...rest }) {
  const ref = React.useRef(null);
  const id = React.useId();
  React.useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const el = ref.current;
    const focusables = () => el.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])');
    (focusables()[0] || el).focus();
    const onKey = (e) => {
      if (e.key === "Escape" && !blocking) { e.preventDefault(); onClose && onClose(); }
      if (e.key === "Tab") {
        const f = focusables(); if (!f.length) return;
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); prev && prev.focus && prev.focus(); };
  }, [open, blocking, onClose]);
  if (!open) return null;
  return (
    <div className={`ds-scrim ds-scrim--drawer${side === "left" ? " ds-scrim--left" : ""}`} onMouseDown={(e) => { if (!blocking && e.target === e.currentTarget) onClose && onClose(); }}>
      <div ref={ref} className={`ds-drawer ${className}`.trim()} style={width ? { "--_w": width } : undefined} role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} tabIndex={-1} {...rest}>
        <div className="ds-drawer__head">
          <h2 className="ds-drawer__title" id={`${id}-title`}>{title}</h2>
          {!blocking && <button type="button" className="ds-modal__x" aria-label="Close" onClick={onClose}><Mark name="m-close" size={16} /></button>}
        </div>
        <div className="ds-drawer__body">{children}</div>
        {footer && <div className="ds-drawer__foot">{footer}</div>}
      </div>
    </div>
  );
}
