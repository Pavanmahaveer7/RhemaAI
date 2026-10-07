/** Flat hairline card (16px radius, no shadow). */
export interface CardProps {
  title?: React.ReactNode;
  /** Mono uppercase label above title */
  eyebrow?: React.ReactNode;
  /** Node aligned right of the header */
  action?: React.ReactNode;
  /** px. Default 20. */
  padding?: number;
  tone?: "default" | "raised" | "lamp";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;
