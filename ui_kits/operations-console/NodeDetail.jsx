/* NodeDetail.jsx — detail view: breadcrumb + record header + properties +
 * data panels + recent events, and the destructive-confirm flow (drain node):
 * critical verb button, names the target, states irreversibility, ghost cancel.
 */
const { Card, SequentialMeter, DivergingMeter, Sparkline, StatusBadge, Button, Tag, Input, Alert, Breadcrumb, KeyValue, Modal, Timeline, Freshness } = window.DesignSystem_019de4;

function NodeDetail({ node, onBack, onDrain }) {
  const [modal, setModal] = React.useState(false);
  const [typed, setTyped] = React.useState("");
  const down = node.step === "critical";
  const armed = typed.trim() === node.id;
  const events = window.OPS_DATA.alerts.filter((a) => a.node === node.id).map((a) => ({ id: a.id, time: a.age + " ago", severity: a.severity, title: a.title, body: a.body }));

  return (
    <div className="ops-stack">
      <Breadcrumb items={[{ label: "Grid", onClick: (e) => { e.preventDefault(); onBack(); } }, { label: "Sector " + node.sector }, { label: node.id }]} />
      <div className="ops-row">
        <Button variant="text" size="sm" icon="m-chevron" className="ops-back" onClick={onBack} aria-label="Back" />
        <h1 className="ops-title">{node.id}</h1>
        <StatusBadge step={node.step} pulse={down} />
        <Tag accent>{node.tlp}</Tag>
        <Freshness state={down ? "offline" : "live"} at="02:14:31Z" />
        <div className="ops-row__end">
          <Button variant="ghost" size="sm" icon="m-refresh">Refresh</Button>
          <Button variant="danger" size="sm" icon="m-delete" onClick={() => setModal(true)}>Drain</Button>
          <Button variant="text" size="sm" iconEnd="m-more" aria-label="More" />
        </div>
      </div>

      {down && <Alert severity="critical" pulse title={"Uplink down — " + node.id + "."}>Unreachable for 4m. Reroute traffic or restore the uplink.</Alert>}

      <div className="ops-grid-detail">
        <div className="ops-stack">
          <Card title="Properties" density="compact">
            <KeyValue items={[
              { key: "Sector", value: node.sector },
              { key: "Region", value: node.region },
              { key: "Uplink", value: <StatusBadge step={node.step} variant="plain" size={13} label={node.uplink.toUpperCase()} /> },
              { key: "Uptime", value: node.uptime, num: true },
              { key: "Requests", value: node.reqs.toLocaleString() + " req/s", num: true },
              { key: "Marking", value: <Tag accent>{node.tlp}</Tag> },
            ]} />
          </Card>
          <Card title="Recent events" density="compact">
            {events.length ? <Timeline events={events} /> : <KeyValue items={[{ key: "Events", value: "None in window" }]} />}
          </Card>
        </div>
        <div className="ops-stack">
          <Card title="Resource" density="compact">
            <div className="ops-stack">
              <SequentialMeter label="cpu" value={node.cpu} warn={75} crit={90} />
              <SequentialMeter label="mem" value={node.mem} warn={75} crit={90} />
              <SequentialMeter label="disk" value={node.disk} warn={80} crit={95} />
              <DivergingMeter label="latency Δ vs baseline" value={Math.max(-6, Math.min(5, Math.round((node.p99 - 40) / 30)))} range={6} unit="σ" />
            </div>
          </Card>
          <Card title="p99 latency · 16m" density="compact" actions={<Tag>threshold 120ms</Tag>}>
            <Sparkline data={node.p99series} mode="threshold" warn={120} crit={200} unit="ms" width={480} height={64} />
          </Card>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={"Drain " + node.id} destructive
             footer={<><Button variant="ghost" onClick={() => setModal(false)}>Cancel</Button><Button variant="danger" icon="m-delete" disabled={!armed} onClick={() => { setModal(false); setTyped(""); onDrain(node); }}>Drain node</Button></>}>
        <div className="ops-stack ops-stack--tight">
          <p>Moves all sessions off {node.id} in sector {node.sector} and marks it offline. This cannot be undone from here; re-enable needs an operator with sector access.</p>
          <Input label={"Type " + node.id + " to confirm"} value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={node.id} />
        </div>
      </Modal>
    </div>
  );
}

Object.assign(window, { NodeDetail });
