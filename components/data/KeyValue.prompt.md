**KeyValue** is the detail-view property list: muted uppercase keys, text values, numerics right-aligned in tabular mono, with row rules and density modes.

```jsx
<KeyValue columns={2} items={[
  { key: "Node", value: "node-13" },
  { key: "Status", value: <StatusBadge step="critical" variant="plain" size={13} /> },
  { key: "CPU", value: "97%", num: true },
  { key: "Region", value: <Tag>us-east</Tag> },
]} />
```
