// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Lovable Admin Dashboard",
  description: "Admin panel for ShopFinyra E-Commerce",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
