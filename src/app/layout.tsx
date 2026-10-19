import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Perché?",
  description: "Le mie lezioni di cultura generale",
  appleWebApp: {
    capable: true,
    title: "Perché?",
    statusBarStyle: "default",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#b45309",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${bricolage.variable} ${atkinson.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main>
          {children}
        </main>
        <header>
          <nav className="flex gap-4">
            <Link href="/">Lezioni</Link>
            <Link href="/percorsi">Percorsi</Link>
            <Link href="/ripasso">Ripasso</Link>
            <Link href="/chiedi">Chiedi</Link>
          </nav>

        </header>
      </body>

    </html>
  );
}
