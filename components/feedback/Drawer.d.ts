import React from "react";

/**
 * Drawer — edge-anchored dialog for detail views; same behavior as Modal.
 *
 * @startingPoint section="Feedback" subtitle="Side panel" viewport="900x400"
 */
export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  title: React.ReactNode;
  side?: "right" | "left";
  /** CSS width (default 28rem). */
  width?: string;
  blocking?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}
export function Drawer(props: DrawerProps): JSX.Element | null;
