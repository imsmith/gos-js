/* AlertsView.jsx — the alerting pattern: active alerts as severity banners over
 * the alert log. Wording follows the voice rules; acknowledge clears a banner.
 */
const { Card, Alert, Button, StatusBadge, Tag, Table, StatePanel } = window.DesignSystem_019de4;

function AlertsView({ data, onSelectNode }) {
  const [acked, setAcked] = React.useState([]);
  const active = data.alerts.filter((a) => !acked.includes(a.id));
  const ack = (id) => setAcked((x) => [...x, id]);

  return (
    <div className="ops-stack">
      <div className="ops-row">
        <h2 className="ops-h2">Active alerts</h2>
        <Tag accent>{active.length}</Tag>
        <div className="ops-row__end"><Button variant="ghost" size="sm" icon="m-bell">Mute 30m</Button></div>
      </div>

      {active.length === 0 ? (
        <StatePanel mode="empty" mark="m-low" title="No active alerts" action={<Button variant="ghost" size="sm" icon="m-refresh" onClick={() => setAcked([])}>Reset</Button>}>Grid nominal.</StatePanel>
      ) : (
        <div className="ops-stack ops-stack--tight">
          {active.map((a) => (
            <Alert key={a.id} severity={a.severity} pulse={a.severity === "critical"} title={a.title} onDismiss={() => ack(a.id)}
                   actions={<><Button variant="ghost" size="sm" icon="m-search" onClick={() => onSelectNode(a.node)}>Inspect {a.node}</Button><Button variant="text" size="sm" onClick={() => ack(a.id)}>Acknowledge</Button></>}>
              {a.body}
            </Alert>
          ))}
        </div>
      )}

      <Card title="Alert log" density="compact" flush>
        <Table density="compact" rows={data.alerts} onSelect={(a) => onSelectNode(a.node)}
               columns={[
                 { key: "id", label: "ID" },
                 { key: "severity", label: "Severity", render: (a) => <StatusBadge step={a.severity} variant="plain" size={13} /> },
                 { key: "node", label: "Node" },
                 { key: "title", label: "Message" },
                 { key: "age", label: "Age", num: true },
               ]} />
      </Card>
    </div>
  );
}

Object.assign(window, { AlertsView });
