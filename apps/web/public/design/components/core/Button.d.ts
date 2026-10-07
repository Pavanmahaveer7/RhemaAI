/**
 * Pill button. Primary = bone on ink (default action); accent = Lamp (one per screen, e.g. Submit / Publish).
 * @startingPoint section="Core" subtitle="Pill buttons — primary, accent, secondary, ghost, danger" viewport="700x320"
 */
export interface ButtonProps {
  variant?: "primary" | "accent" | "secondary" | "ghost" | "danger";
  /** sm 36px · md 44px (min tap) · lg 56px */
  size?: "sm" | "md" | "lg";
  /** Lucide icon name before the label */
  icon?: string;
  iconRight?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
