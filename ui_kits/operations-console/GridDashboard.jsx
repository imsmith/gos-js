/* GridDashboard.jsx — the signature dashboard: stat tiles + status-at-scale
 * heatmap + hot nodes + a dense node table. Compact density throughout.
 */
const { Card, Heatmap, SequentialMeter, Sparkline, StatusBadge, StatTile, Table, Button, Tag } = window.DesignSystem_019de4;

function GridDashboard({ data, onSelectNode }) {
  const { nodes, summary } = data;
  const cells = nodes.map((n) => ({ id: n.id, value: n.dev, label: n.id + " · " + n.uplink }));
  const hot = nodes.filter((n) => n.step === "critical" || n.step === "high");
  const [sort, setSort] = React.useState({ key: "p99", dir: "descending" });
  const rows = [...nodes].sort((a, b) => (sort.dir === "ascending" ? a[sort.key] - b[sort.key] : b[sort.key] - a[sort.key])).slice(0, 12);

  return (
    <div className="ops-stack">
      <div className="ops-grid-4">
        <StatTile label="Nodes online" value={summary.total - summary.unk} unit={"/ " + summary.total}><Sparkline data={[44,45,46,45,47,46,47,47]} showEnd={false} width={140} height={20} /></StatTile>
        <StatTile label="Down" value={summary.down} delta={+1} step="critical"><Sparkline data={[0,0,0,0,0,1,1,1]} mode="threshold" crit={1} showEnd={false} width={140} height={20} /></StatTile>
        <StatTile label="Alerts" value={summary.alert} delta={0} step="high"><Sparkline data={[1,1,2,1,2,2,2,2]} showEnd={false} width={140} height={20} /></StatTile>
        <StatTile label="p99 grid" value={61} unit="ms" delta={+3} deltaUnit="ms"><Sparkline data={[40,42,48,52,49,55,58,61]} mode="threshold" warn={50} crit={120} showEnd={false} width={140} height={20} /></StatTile>
      </div>

      <div className="ops-grid-main">
        <Card title="Grid health · deviation from nominal" density="compact" actions={<Tag accent>{nodes.length} nodes</Tag>}>
          <Heatmap columns={12} cells={cells} unit="Δ" onSelect={(c) => onSelectNode(c.id)} />
        </Card>
        <Card title="Hot nodes" density="compact" actions={<Button variant="text" size="sm" iconEnd="m-chevron">All</Button>}>
          <div className="ops-stack ops-stack--tight">
            <Table density="dense" rows={hot} onSelect={(r) => onSelectNode(r.id)}
                   columns={[
                     { key: "step", label: "Status", render: (r) => <StatusBadge step={r.step} variant="plain" size={13} /> },
                     { key: "id", label: "Node" },
                     { key: "p99", label: "p99 ms", num: true },
                   ]} />
            <SequentialMeter label="grid cpu" value={64} warn={75} crit={90} />
            <SequentialMeter label="grid mem" value={71} warn={75} crit={90} />
            <SequentialMeter label="grid disk" value={48} warn={80} crit={95} />
          </div>
        </Card>
      </div>

      <Card title="Nodes" density="compact" flush
            actions={<><Button variant="text" size="sm" icon="m-filter">Filter</Button><Button variant="text" size="sm" icon="m-download">Export</Button></>}>
        <Table density="compact" rows={rows} sort={sort} onSort={(k) => setSort({ key: k, dir: sort.key === k && sort.dir === "descending" ? "ascending" : "descending" })}
               onSelect={(r) => onSelectNode(r.id)}
               columns={[
                 { key: "id", label: "Node" },
                 { key: "sector", label: "Sector" },
                 { key: "step", label: "Status", render: (r) => <StatusBadge step={r.step} variant="plain" size={13} /> },
                 { key: "cpu", label: "CPU %", num: true, sortable: true },
                 { key: "p99", label: "p99 ms", num: true, sortable: true },
                 { key: "reqs", label: "req/s", num: true, sortable: true, render: (r) => r.reqs.toLocaleString() },
                 { key: "trend", label: "Trend", render: (r) => <Sparkline data={r.cpuseries} showEnd={false} width={72} height={16} /> },
               ]} />
      </Card>
    </div>
  );
}

Object.assign(window, { GridDashboard });
