import React from "react";

/**
 * AppShell — header (brand · summary · meta · actions) over sidebar nav + main.
 *
 * @startingPoint section="Layout" subtitle="App frame — header, nav, main" viewport="900x400"
 */
export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: React.ReactNode;
  /** Status summary: StatusBadges with counts. */
  summary?: React.ReactNode;
  /** Clock, Freshness, theme switch. */
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  /** Sidebar nav (a Menu with variant="sidebar"). Omit for a single-column shell. */
  nav?: React.ReactNode;
  /** CSS width of the nav column (default 200px). */
  navWidth?: string;
  children?: React.ReactNode;
}
export function AppShell(props: AppShellProps): JSX.Element;
