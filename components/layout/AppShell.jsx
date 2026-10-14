import React from "react";

/* AppShell (manual/06 · app shell). Fixed header — brand · status summary ·
 * meta (clock, freshness) · actions — over a sidebar nav and a scrolling main.
 * The shell carries no data of its own: pass a <Menu variant="sidebar"> as
 * `nav`, StatusBadges as `summary`, a <Freshness> in `meta`.
 */
export function AppShell({ brand, summary, meta, actions, nav, navWidth, children, className = "", ...rest }) {
  return (
    <div className={["ds-shell", nav ? "" : "ds-shell--no-nav", className].filter(Boolean).join(" ")} style={navWidth ? { "--_nav": navWidth } : undefined} {...rest}>
      <header className="ds-shell__head">
        {brand && <div className="ds-shell__brand">{brand}</div>}
        {summary && <div className="ds-shell__summary">{summary}</div>}
        <div className="ds-shell__meta">
          {meta}
          {actions && <div className="ds-shell__actions">{actions}</div>}
        </div>
      </header>
      {nav && <nav className="ds-shell__nav">{nav}</nav>}
      <main id="main" className="ds-shell__main">{children}</main>
    </div>
  );
}
