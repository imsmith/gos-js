import React from "react";

/** SkipLink — visually hidden until focused; jumps to #main. */
export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: React.ReactNode;
}
export function SkipLink(props: SkipLinkProps): JSX.Element;
