/** Transient confirmation. Never used to announce a stage advance from the agent. */
export interface ToastProps {
  tone?: "neutral" | "ok" | "error";
  children?: React.ReactNode;
  onClose?: () => void;
}
export function Toast(props: ToastProps): JSX.Element;
