/** Labelled single-line input. Label is always visible (accessibility rule). */
export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Leading Lucide icon */
  icon?: string;
  hint?: string;
  /** Plain-sentence error; replaces hint */
  error?: string;
  /** md 48px · lg 60px (search hero) */
  size?: "md" | "lg";
  type?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
  autoComplete?: string;
  inputMode?: "text" | "numeric" | "email" | "search" | "tel" | "url" | "decimal" | "none";
  enterKeyHint?: "search" | "send" | "go" | "next" | "done" | "enter";
}
export function TextField(props: TextFieldProps): JSX.Element;
