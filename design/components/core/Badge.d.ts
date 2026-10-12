/** Small status badge. Reviewer/admin screens only for warn/danger — pastor screens use neutral or ok. */
export interface BadgeProps {
  tone?: "ok" | "warn" | "danger" | "info" | "neutral";
  /** Leading dot. Default true. */
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): JSX.Element;
