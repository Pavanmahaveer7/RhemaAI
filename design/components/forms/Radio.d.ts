/** Single choice in a group; 44px min row height. */
export interface RadioProps {
  label: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  value?: string;
  description?: React.ReactNode;
}
export function Radio(props: RadioProps): JSX.Element;
