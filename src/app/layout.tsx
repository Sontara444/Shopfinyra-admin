import "./globals.css";

export const metadata = {
  title: "Finyra Admin",
  description: "Admin portal for managing Finyra content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
