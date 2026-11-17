/** Lucide icon (CDN, rendered as a currentColor mask). */
export interface IconProps {
  /** Semantic key, e.g. "search", "book-open" (mapped to Heroicons in Icon.jsx). */
  name: string;
  /** "regular" (default) or "fill" — use fill only for the selected tab / nav item. */
  weight?: "regular" | "fill";
  /** px. Default 20. */
  size?: number;
  color?: string;
  /** Accessible label; omit for decorative icons. */
  label?: string;
  style?: React.CSSProperties;
}
export function Icon(props: IconProps): JSX.Element;
