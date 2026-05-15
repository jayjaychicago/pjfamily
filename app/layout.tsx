import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "une maison, mille mondes",
  description: "PJ Family",

  openGraph: {
    title: "une maison, mille mondes",
    description: "PJ Family",
    images: [
      {
        url: "/pjfamily.jpg",
        width: 1200,
        height: 630,
        alt: "PJ Family",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "une maison, mille mondes",
    images: ["/pjfamily.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}