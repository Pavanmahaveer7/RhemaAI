/**
 * Pill segmented switch. Used for Normal / Faith mode and graph readings.
 * @startingPoint section="Forms" subtitle="Normal / Faith mode switch and other segmented choices" viewport="700x360"
 */
export interface SegmentedControlProps {
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  /** aria-label for the group */
  label?: string;
  size?: "sm" | "md";
  /** When this value is selected it renders in Lamp (e.g. "faith"). */
  accentValue?: string;
  style?: React.CSSProperties;
}
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
