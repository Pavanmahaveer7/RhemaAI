/** Modal confirmation, e.g. confirming a leadership outcome or publishing a graph. */
export interface DialogProps {
  open: boolean;
  title: React.ReactNode;
  children?: React.ReactNode;
  /** Buttons, right-aligned */
  actions?: React.ReactNode;
  onClose?: () => void;
  /** px max width, default 480 */
  width?: number;
  /** Render without scrim/fixed positioning (for specimens) */
  inline?: boolean;
}
export function Dialog(props: DialogProps): JSX.Element | null;
