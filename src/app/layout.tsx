import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import DynamicScrollbar from "@/components/DynamicScrollbar";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "The School of Options - Learn Options Trading with Expert Mentorship",
  description: "The first institution dedicated 100% to Options Trading. Join our 6-month mentorship program and learn from 20+ years of trading experience. 90% of traders lose money - we simplify it.",
  keywords: "options trading, trading mentorship, options education, trading course, financial education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        <AuthProvider>
          <DynamicScrollbar />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
