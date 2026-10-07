/** The five monthly-pack pieces as tiles that land one by one, instead of a "4/5" bar. A piece that's in gets a small lime check; a missing piece is a dashed outline. */
export interface PackPiece { label: string; icon: string; in: boolean; }
export interface PackPiecesProps {
  pieces: PackPiece[];
  compact?: boolean;
}
export function PackPieces(props: PackPiecesProps): JSX.Element;
