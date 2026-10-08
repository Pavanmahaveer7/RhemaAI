/**
 * Loading / empty / error / unavailable / uncovered — every data screen needs all of these.
 * @startingPoint section="Feedback" subtitle="Required data states: loading, empty, error+retry, unavailable, uncovered" viewport="700x420"
 */
export interface StateBlockProps {
  kind?: "loading" | "empty" | "error" | "unavailable" | "uncovered";
  title?: string;
  /** One plain sentence. For loading without message, renders skeleton lines. */
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  compact?: boolean;
  /** Empty states: the subject word, outlined and faint, settles in above the text. Use a word that tells the person what is (not) here. */
  word?: string;
  /** Quiet abstract motion behind the word: "map" (bubbles), "people" (dashed circles), "word" (three tradition dots), "check" (a check that draws once). */
  motif?: "map" | "people" | "word" | "check";
  /** One next step for an empty state. */
  action?: { label: string; icon?: string; onClick: () => void };
}
export function StateBlock(props: StateBlockProps): JSX.Element;
