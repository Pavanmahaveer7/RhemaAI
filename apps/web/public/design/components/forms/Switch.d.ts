/** On/off toggle for settings and graph overlays. */
export interface SwitchProps {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Name for screen readers when there is no visible label. */
  "aria-label"?: string;
}
export function Switch(props: SwitchProps): JSX.Element;
