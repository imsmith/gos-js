**LogView** is the ops log: a `bg` well of mono lines with a muted timestamp, a severity word plus glyph, and the message. It follows the tail; scrolling up pauses and shows `PAUSED · n new`, which resumes.

```jsx
<LogView height="16rem" lines={[
  { ts: "02:14:31Z", severity: "critical", msg: "Uplink down — sector 12. 4 nodes unreachable. Reroute or restore." },
  { ts: "02:14:02Z", severity: "medium", msg: "Latency 41ms on node-13, above 40ms threshold." },
  { ts: "02:13:50Z", severity: "info", msg: "Rebooted node-12. Telemetry nominal." },
]} />
```

Rules
- Severity is word + glyph + color, never color alone; critical lines also get a faint row tint.
- Each message follows what happened · why · what to do.
