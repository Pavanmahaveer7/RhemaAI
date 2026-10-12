/**
 * The pastor's own path as a ring of five seasons, instead of a progress bar. Done seasons are solid bone, the current season is lime with a slow breathing halo, and later seasons are dotted. Tap a season to read its name in the centre. Pastor-facing only; the reviewer queue keeps StageTrack.
 */
export interface SeasonRingProps {
  /** 0-based current stage. Only a human leadership outcome moves it. */
  current?: number;
  stages?: string[];
  /** e.g. "since Jun 2026" */
  since?: string;
  /** px, default 232 */
  size?: number;
  /** Caption under the ring; false hides it */
  grow?: boolean; glow?: boolean; caption?: string | false;
}
export function SeasonRing(props: SeasonRingProps): JSX.Element;
