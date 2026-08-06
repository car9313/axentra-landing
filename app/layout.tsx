import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import { cookies, headers } from "next/headers";

import "./globals.css";

import LocaleProvider from "@/app/components/locale/LocaleProvider";
import { SkipLink } from "@/app/components/locale/SkipLink";
import {
  DEFAULT_LOCALE,
  COOKIE_KEY,
  I18N_LOCALE_HEADER,
} from "@/lib/locale/domain/locale.constants";
import { SUPPORTED_LOCALES } from "@/lib/locale/domain/locale.config";
import type { LocaleId } from "@/lib/locale/domain/locale.types";
import { getMetadataForLocale } from "@/lib/locale/server/server-metadata";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

async function resolveServerLocale(): Promise<LocaleId> {
  const headerLocale = (await headers()).get(I18N_LOCALE_HEADER);
  if (
    headerLocale &&
    SUPPORTED_LOCALES.some((locale) => locale.id === headerLocale)
  ) {
    return headerLocale as LocaleId;
  }

  const cookieLocale = (await cookies()).get(COOKIE_KEY)?.value;
  if (
    cookieLocale &&
    SUPPORTED_LOCALES.some((locale) => locale.id === cookieLocale)
  ) {
    return cookieLocale as LocaleId;
  }

  return DEFAULT_LOCALE;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveServerLocale();
  const metadata = getMetadataForLocale(locale);

  return {
    title: metadata.title,
    description: metadata.description,
    icons: [
      { rel: "icon", url: "/favicon/favicon.ico" },
      { rel: "icon", type: "image/svg+xml", url: "/favicon/favicon.svg" },
      { rel: "apple-touch-icon", url: "/favicon/apple-touch-icon.png" },
    ],
    manifest: "/favicon/site.webmanifest",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveServerLocale();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LocaleProvider>
          <SkipLink />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
