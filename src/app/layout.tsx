import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CompareFloatingBar } from "@/components/layout/CompareFloatingBar";

export const metadata: Metadata = {
  title: "BillBazaar — Indian Digital Asset Locker & Insurance Comparison",
  description:
    "Interactive fintech prototype consolidating purchase invoices, warranties, and vehicle identifiers with transparent side-by-side insurance policy comparison.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8F9FB] text-slate-900">
        <AppProvider>
          <Suspense fallback={<div className="h-16 bg-white border-b border-slate-200" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <CompareFloatingBar />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
