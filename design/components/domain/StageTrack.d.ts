/**
 * The five-stage pastor path with the current stage marked in Lamp. Only a human leadership outcome moves `current`.
 * @startingPoint section="Pipeline" subtitle="Candidate → Ongoing development path marker" viewport="700x300"
 */
export interface StageTrackProps {
  /** 0-based index into stages */
  current?: number;
  /** Defaults to the five canonical stages */
  stages?: string[];
  /** horizontal on desktop, vertical on phone */
  orientation?: "horizontal" | "vertical";
  compact?: boolean;
}
export function StageTrack(props: StageTrackProps): JSX.Element;
