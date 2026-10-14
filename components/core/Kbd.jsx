import React from "react";

/* Kbd — key-name chips; combinations joined with "+". keys: ["⌘", "K"] or "Esc". */
export function Kbd({ keys, className = "", ...rest }) {
  const list = Array.isArray(keys) ? keys : [keys];
  return (
    <span className={`ds-kbd ${className}`.trim()} {...rest}>
      {list.map((k, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="ds-kbd__plus" aria-hidden="true">+</span>}
          <kbd>{k}</kbd>
        </React.Fragment>
      ))}
    </span>
  );
}
