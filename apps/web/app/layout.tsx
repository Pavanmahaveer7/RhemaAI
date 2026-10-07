export const metadata = {
  title: "Church AI",
  description: "Phase 0 local status",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: "2rem", maxWidth: 720 }}>
        {children}
      </body>
    </html>
  );
}
