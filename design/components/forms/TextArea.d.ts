/** Labelled multi-line input with optional live character count. */
export interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Shows "n / max" counter */
  maxLength?: number;
  rows?: number;
  hint?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
export function TextArea(props: TextAreaProps): JSX.Element;
