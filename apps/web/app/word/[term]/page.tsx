import ReaderPage from "@/src/components/ReaderPage";

export default async function WordPage({ params }: { params: Promise<{ term: string }> }) {
  const { term } = await params;
  return <ReaderPage screen="term" term={decodeURIComponent(term)} />;
}
