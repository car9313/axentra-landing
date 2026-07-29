import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Axentra Systems — Where Intelligence Becomes Architecture",
  description:
    "Technology consulting, intelligent software, AI & automation, and cloud platforms for enterprises.",
  icons: [
    { rel: "icon", url: "/favicon/favicon.ico" },
    { rel: "icon", type: "image/svg+xml", url: "/favicon/favicon.svg" },
    { rel: "apple-touch-icon", url: "/favicon/apple-touch-icon.png" },
  ],
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-axentra-blue)] focus:text-white focus:rounded-[8px] focus:text-sm focus:font-semibold focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
