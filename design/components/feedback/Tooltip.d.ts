/** Hover/focus tooltip; bone on ink for contrast. */
export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: "top" | "bottom";
}
export function Tooltip(props: TooltipProps): JSX.Element;
