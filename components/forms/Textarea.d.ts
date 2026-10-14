import React from "react";

/** Textarea — labelled multi-line field with helper/error states. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  error?: React.ReactNode;
  helper?: React.ReactNode;
}
export function Textarea(props: TextareaProps): JSX.Element;
