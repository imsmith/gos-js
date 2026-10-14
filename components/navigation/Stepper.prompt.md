**Stepper** is the wizard's spine: numbered discs joined by connectors. Done steps show the `m-low` check in accent, the current step is an accent fill, blocked steps carry `m-critical`.

```jsx
<Stepper current="targets" steps={[{ id: "scope", label: "Scope" }, { id: "targets", label: "Targets" }, { id: "review", label: "Review" }]} />
```

State is never color-only: the number, check, or critical glyph carries it. Terminal form: `[✓] Scope  [2] Targets  [ ] Review`.
