/** Round icon-only button. Always pass a label. */
export interface IconButtonProps {
  icon: string;
  /** Required accessible label (also tooltip). */
  label: string;
  /** px, default 44 (min tap target). */
  size?: number;
  variant?: "ghost" | "filled" | "outline";
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function IconButton(props: IconButtonProps): JSX.Element;
