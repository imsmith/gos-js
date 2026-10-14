**Freshness** says whether what you are looking at is current: a word (`LIVE`, `PAUSED`, `STALE`, `OFFLINE`), a reinforcing dot, and the last-update time.

```jsx
<Freshness state="live" at="02:14:31Z" />
<Freshness state="stale" at="01:58:04Z" />
```

Rules
- The word is the signal; the dot and its color only reinforce. Live pulses; stale is medium, offline is critical.
