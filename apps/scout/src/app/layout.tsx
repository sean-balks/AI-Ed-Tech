import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scout | AI-Powered MCAT Prep",
  description: "The first AI tutor built specifically for the MCAT. Diagnoses your weakest areas, teaches concepts that stick, and adapts every session — for $79/month.",
  icons: {
    icon: [
      { url: "/scout-logo-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/scout-logo-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/scout-logo-192x192.png",
  },
  openGraph: {
    images: [{ url: "/scout-logo-512x512.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
