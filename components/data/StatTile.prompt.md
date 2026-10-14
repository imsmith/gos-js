**StatTile** is the dashboard KPI: caption label, a big tabular number with a muted unit, an optional signed delta that carries a diverging mark, and a foot row for a sparkline or status badge.

```jsx
<StatTile label="CPU node-13" value={97} unit="%" delta={+4} deltaUnit="pt" step="critical">
  <Sparkline data={series} />
  <StatusBadge step="critical" variant="plain" size={13} />
</StatTile>
```

Rules
- The delta's sign is carried by the mark (`m-warm` up, `m-cool` down), never color alone.
- `step` colors the value only on dark surfaces; the badge is the status carrier on light.
