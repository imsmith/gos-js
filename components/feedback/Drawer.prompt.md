**Drawer** is the modal anchored to an edge: a full-height surface panel for the detail view beside a dashboard, so the heatmap stays in view.

```jsx
<Drawer open={!!node} onClose={() => setNode(null)} title={node && node.id}
        footer={<Button variant="ghost" onClick={() => setNode(null)}>Close</Button>}>
  <KeyValue items={props} />
</Drawer>
```

Behaves like the modal: focus trapped and returned, Escape and scrim dismiss unless `blocking`.
