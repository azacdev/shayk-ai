import type { Metadata } from "next";

import "@/styles/globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Shayk AI",
  description: "Shayk AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
