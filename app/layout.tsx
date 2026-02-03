import "./globals.css";

export const metadata = {
  title: "Deriverse Trading Analytics",
  description: "On-chain trading analytics dashboard for Deriverse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100">
        <main className="max-w-7xl mx-auto px-6 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
