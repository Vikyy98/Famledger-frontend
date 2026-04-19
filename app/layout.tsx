import type { Metadata } from "next";
import "./globals.css";
import { ProviderWrapper } from "./Provider";

export const metadata: Metadata = {
  title: "FamLedger",
  description: "Manage your family finances together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
