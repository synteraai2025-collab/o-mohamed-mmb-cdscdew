import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { BarChart3, FileText, Home } from "lucide-react";
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
        <nav className="bg-primary text-primary-foreground p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <BarChart3 className="h-6 w-6" />
              <h1 className="text-xl font-bold">Sales Dashboard</h1>
            </Link>
            <div className="flex space-x-6">
              <Link 
                href="/" 
                className="flex items-center space-x-1 hover:text-accent transition-colors duration-200 px-3 py-2 rounded-md hover:bg-primary/90"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link 
                href="/reports" 
                className="flex items-center space-x-1 hover:text-accent transition-colors duration-200 px-3 py-2 rounded-md hover:bg-primary/90"
              >
                <FileText className="h-4 w-4" />
                <span>Reports</span>
              </Link>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

