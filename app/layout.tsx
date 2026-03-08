import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Português Navigator | Learn Portuguese Fast with Memory Tricks",
  description: "Learn Portuguese vocabulary, greetings, phrases, and numbers quickly using clever phonetic memory tricks and interactive flashcards.",
  keywords: ["learn portuguese", "portuguese language", "portuguese phonetic", "portuguese memory tricks", "portuguese flashcards", "portuguese app"],
  authors: [{ name: "Paresh Patel" }],
  openGraph: {
    title: "Português Navigator | Learn Portuguese with Mnemonics",
    description: "Master Portuguese vocabulary quickly using clever phonetic memory tricks and interactive flashcards. Start learning today!",
    url: "https://portuguese-learning.vercel.app", // Adjust if deployed elsewhere
    siteName: "Português Navigator",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Português Navigator',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Any',
  description: 'An interactive web application helping users learn Portuguese vocabulary using phonetic memory tricks and flashcards.',
  offers: {
    '@type': 'Offer',
    price: '0.00',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Person',
    name: 'Paresh Patel',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
