**Timeline** lists events down a rule: a severity-colored dot with the status glyph, a muted time, a title, and an optional body. Newest first unless stated.

```jsx
<Timeline events={[
  { time: "02:14:31Z", severity: "critical", title: "Uplink down — sector 12.", body: "4 nodes unreachable for 4m." },
  { time: "02:14:02Z", severity: "medium", title: "Latency 41ms on node-13." },
  { time: "02:13:50Z", title: "Rebooted node-12." },
]} />
```
