import ReaderPage from "@/src/components/ReaderPage";

export default async function WelcomeStepPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = await params;
  return <ReaderPage screen="intro" step={step} />;
}
