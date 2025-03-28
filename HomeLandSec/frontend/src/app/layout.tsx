import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/nav";
import Footer from "@/components/ui/footer";
import QuestionContext, { QuestionProvider } from "@/contexts/questionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Security Survey",
  description: "Please rank the following comments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QuestionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
        >
          <header className="flex-none">
            <Nav />
          </header>
          <main className="flex-grow overflow-auto bg-gray-50">{children}</main>
          <Footer />
        </body>
      </QuestionProvider>
    </html>
  );
}
