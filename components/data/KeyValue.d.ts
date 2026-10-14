import React from "react";

/** KeyValue — definition list for detail views; numeric values right-aligned. */
export interface KeyValueItem {
  key: React.ReactNode;
  value: React.ReactNode;
  num?: boolean;
}
export interface KeyValueProps extends React.HTMLAttributes<HTMLDListElement> {
  items: KeyValueItem[];
  density?: "comfortable" | "compact" | "dense";
  /** 1 (default) or 2 key/value column pairs. */
  columns?: 1 | 2;
}
export function KeyValue(props: KeyValueProps): JSX.Element;
