import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { AgentBridge } from "@/components/agent-bridge";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/content/site";
import { StructuredData } from "@/components/structured-data";
import { pageMetadata, titleSeparator } from "@/lib/metadata";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMetadata({ path: "/" }),
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s${titleSeparator}${site.name}` },
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

const credits = [
  { name: "shud.in", href: "https://shud.in" },
  { name: "paco.me", href: "https://paco.me" },
];

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <StructuredData />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="fixed top-0 left-0 z-50 -translate-y-full rounded-br-lg bg-foreground px-4 py-2 text-sm text-background focus:translate-y-0 focus:text-background"
        >
          Skip to main content
        </a>

        <SiteNav />

        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto w-full max-w-3xl flex-1 px-5 pt-8 pb-12 outline-none md:px-8 md:pt-12 md:pb-16"
        >
          {children}
        </main>

        <footer className="mx-auto w-full max-w-3xl px-5 md:px-8">
          <p className="border-t border-border pt-6 pb-8 text-center text-[0.72rem] text-muted-foreground italic">
            Inspired from{" "}
            {credits.map((credit, i) => (
              <span key={credit.href}>
                {i > 0 && " and "}
                <a
                  href={credit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${credit.name} (opens in new tab)`}
                  className="text-muted-foreground underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-foreground hover:decoration-foreground"
                >
                  {credit.name}
                </a>
              </span>
            ))}{" "}
            · © {year} {site.name}
          </p>
        </footer>

        <AgentBridge />
      </body>
    </html>
  );
}
