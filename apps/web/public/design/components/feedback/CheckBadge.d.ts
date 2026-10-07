/** Verification slot (Lexicon, Citation, Tone audit). Always shows a check or a visible reason — never a silent pass. */
export interface CheckBadgeProps {
  label: string;
  status?: "pass" | "fail" | "pending" | "empty";
  /** Visible reason line. Required in practice for fail/pending. */
  reason?: string;
}
export function CheckBadge(props: CheckBadgeProps): JSX.Element;
