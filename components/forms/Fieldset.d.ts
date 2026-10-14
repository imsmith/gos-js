import React from "react";

/** Fieldset — grouped fields under a muted uppercase legend. */
export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: React.ReactNode;
  hint?: React.ReactNode;
  children?: React.ReactNode;
}
export function Fieldset(props: FieldsetProps): JSX.Element;
