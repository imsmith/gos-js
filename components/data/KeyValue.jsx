import React from "react";

/* KeyValue (manual/06 · key-value list). Two-column definition list: muted
 * uppercase keys, text values, numeric values right-aligned in tabular mono,
 * row rules. Density modes as for tables. items: [{ key, value, num? }].
 */
export function KeyValue({ items = [], density = "compact", columns = 1, className = "", ...rest }) {
  const cls = ["ds-kv", density !== "compact" ? `ds-kv--${density}` : "", columns === 2 ? "ds-kv--2col" : "", className].filter(Boolean).join(" ");
  return (
    <dl className={cls} {...rest}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <dt className="ds-kv__k">{it.key}</dt>
          <dd className={`ds-kv__v${it.num ? " ds-kv__v--num" : ""}`}>{it.value}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
