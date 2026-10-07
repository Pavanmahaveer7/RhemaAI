export const metadata = {
  title: "Rhema.ai",
  description: "One word. Three faiths.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0b0f0c" }}>{children}</body>
    </html>
  );
}
