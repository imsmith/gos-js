/* Shell.jsx — the Operations Console chrome on the design-system AppShell:
 * brand · status summary · freshness · theme select · actions, over a sidebar
 * Menu. Pure chrome; the active screen is passed as children.
 */
const { AppShell, Menu, Mark, StatusBadge, Freshness, Select, Button, SkipLink } = window.DesignSystem_019de4;

const NAV = [
  { id: "grid", label: "Grid", icon: "m-menu" },
  { id: "alerts", label: "Alerts", icon: "m-bell" },
  { id: "nodes", label: "Nodes", icon: "m-user" },
  { separator: true },
  { id: "policy", label: "Policy", icon: "m-lock" },
  { id: "settings", label: "Settings", icon: "m-settings" },
];

function Shell({ active, onNav, summary, theme, onTheme, onLogout, children }) {
  return (
    <AppShell
      brand={<><SkipLink /><Mark name="m-settings" size={18} />GRID·OPS</>}
      summary={<>
        {summary.down > 0 && <StatusBadge step="critical" label={summary.down + " DOWN"} pulse />}
        {summary.alert > 0 && <StatusBadge step="high" label={summary.alert + " ALERT"} />}
        {summary.warn > 0 && <StatusBadge step="medium" label={summary.warn + " WARN"} />}
        <StatusBadge step="low" label={summary.ok + " OK"} />
      </>}
      meta={<Freshness state="live" at="02:14:31Z" />}
      actions={<>
        <Select aria-label="Theme" value={theme} onChange={(e) => onTheme(e.target.value)} options={["tron", "matrix", "compaq"]} />
        <Button variant="text" size="sm" icon="m-bell" aria-label="Notifications">{summary.alert}</Button>
        <Button variant="text" size="sm" icon="m-user" aria-label="Log out" onClick={onLogout} />
      </>}
      nav={<>
        <Menu variant="sidebar" label="Sections" items={NAV} selected={active} onSelect={(it) => onNav(it.id)} />
        <div className="ops-nav-foot"><div>{summary.total} nodes</div><div>4 sectors</div></div>
      </>}
    >
      {children}
    </AppShell>
  );
}

Object.assign(window, { Shell });
