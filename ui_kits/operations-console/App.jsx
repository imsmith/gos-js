/* App.jsx — Operations Console orchestrator. Fake auth + nav + theme state ties
 * the screens together. Mounts into #root.
 */
const { StatePanel, Toast, ToastStack, Button } = window.DesignSystem_019de4;

function App() {
  const data = window.OPS_DATA;
  const [authed, setAuthed] = React.useState(true);
  const [theme, setTheme] = React.useState("tron");
  const [nav, setNav] = React.useState("grid");
  const [sel, setSel] = React.useState(null);
  const [toasts, setToasts] = React.useState([]);
  const notify = (severity, title) => setToasts((t) => [...t, { id: Date.now(), severity, title }]);
  const drop = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  React.useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  if (!authed) return <window.LoginScreen onAuth={() => setAuthed(true)} />;

  const selectNode = (id) => { setSel(id); setNav("grid"); };
  const node = sel && data.nodes.find((n) => n.id === sel);

  let screen;
  if (nav === "grid" || nav === "nodes") {
    screen = node
      ? <window.NodeDetail node={node} onBack={() => setSel(null)} onDrain={(n) => { setSel(null); notify("low", "Drained " + n.id + "."); }} />
      : <window.GridDashboard data={data} onSelectNode={selectNode} />;
  } else if (nav === "alerts") {
    screen = <window.AlertsView data={data} onSelectNode={selectNode} />;
  } else {
    screen = (
      <StatePanel mode="empty" title={nav === "policy" ? "No policy changes in window" : "Settings"}
                  action={<Button variant="ghost" size="sm" icon="m-add">{nav === "policy" ? "New policy" : "Edit"}</Button>}>
        Pattern omitted from this kit.
      </StatePanel>
    );
  }

  return (
    <window.Shell active={nav} onNav={(n) => { setNav(n); if (n !== "grid") setSel(null); }} summary={data.summary} theme={theme} onTheme={setTheme}
                  onLogout={() => { setAuthed(false); setSel(null); setNav("grid"); }}>
      {screen}
      <ToastStack>{toasts.map((t) => <Toast key={t.id} severity={t.severity} title={t.title} onDismiss={() => drop(t.id)} />)}</ToastStack>
    </window.Shell>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
