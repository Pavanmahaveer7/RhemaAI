/** Native select styled to the system. */
export interface SelectProps {
  label?: string;
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  hint?: string;
  error?: string;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}
export function Select(props: SelectProps): JSX.Element;
