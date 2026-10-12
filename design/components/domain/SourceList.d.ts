/** Sources block (tradition, work, reference). Sits under every comparative answer. */
export interface Source {
  tradition?: "Hindu" | "Buddhist" | "Christian" | string;
  work: string;
  reference?: string;
  /** Quoted text, shown only when the passage is loaded from a licence-checked source */
  quote?: string;
  translation?: string;
  license?: string;
  url?: string | null;
}
export interface SourceListProps {
  sources?: Source[];
  title?: string;
  /** Shown when sources is empty */
  emptyText?: string;
}
export function SourceList(props: SourceListProps): JSX.Element;
