import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "@/config/font";
import QueryProvider from "@/config/queryclient";
import UserProvider from "@/config/userContext";

export const metadata: Metadata = {
  title: "Reppoo",
  description: "Reppoo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <QueryProvider>
          <UserProvider>{children}</UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
