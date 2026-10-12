/** Boolean choice; 44px min row height. */
export interface CheckboxProps {
  label: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  description?: React.ReactNode;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
