/** Uppercase mono label chip. Tradition tones are equal weight — never order them by preference. */
export interface TagProps {
  tone?: "hindu" | "buddhist" | "christian" | "neutral" | "lamp";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Tag(props: TagProps): JSX.Element;
