import React from "react";

/* SkipLink — the first focusable element on a page, visible only on focus,
 * jumping to the main landmark (manual/10). AppShell's main has id "main".
 */
export function SkipLink({ href = "#main", children = "Skip to content", className = "", ...rest }) {
  return <a href={href} className={`ds-skip ${className}`.trim()} {...rest}>{children}</a>;
}
