import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sales Dashboard",
  description: "Professional sales dashboard for monitoring performance metrics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <nav className="bg-primary text-primary-foreground p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Sales Dashboard</h1>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">Overview</a>
              <a href="#" className="hover:text-accent transition-colors">Analytics</a>
              <a href="#" className="hover:text-accent transition-colors">Reports</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
