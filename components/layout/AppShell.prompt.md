**AppShell** is the app frame: a fixed header with the brand wordmark, a status summary, meta (clock, freshness), and actions, over a sidebar nav and a scrolling main area.

```jsx
<AppShell brand={<><Mark name="m-settings" size={18} />GRID·OPS</>}
          summary={<><StatusBadge step="critical" label="2 DOWN" pulse /><StatusBadge step="low" label="61 OK" /></>}
          meta={<Freshness state="live" at="02:14:31Z" />}
          actions={<Button variant="text" icon="m-bell" aria-label="Notifications" />}
          nav={<Menu variant="sidebar" items={items} selected={view} onSelect={(it) => setView(it.id)} />}>
  {content}
</AppShell>
```

Rules
- The shell carries no data: badges, freshness, and nav are passed in.
- Header and nav are `surface`; main is `bg`.
