import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ProviderWrapper } from "./Provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://famledger.app";
const description =
  "FamLedger helps families track shared income, expenses, and debts in one place.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FamLedger — Family finance, together",
    template: "%s · FamLedger",
  },
  description,
  applicationName: "FamLedger",
  openGraph: {
    type: "website",
    siteName: "FamLedger",
    title: "FamLedger — Family finance, together",
    description,
    url: siteUrl,
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "FamLedger" }],
  },
  twitter: {
    card: "summary",
    title: "FamLedger — Family finance, together",
    description,
    images: ["/icon-512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className={`${jakarta.className} antialiased`}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
