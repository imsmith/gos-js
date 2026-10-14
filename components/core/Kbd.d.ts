import React from "react";

/** Kbd — key-name chips joined with +. */
export interface KbdProps extends React.HTMLAttributes<HTMLSpanElement> {
  keys: string | string[];
}
export function Kbd(props: KbdProps): JSX.Element;
