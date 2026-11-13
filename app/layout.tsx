import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { AgentBridge } from "@/components/agent-bridge";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
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

const fullTitle = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  ...pageMetadata({ path: "/" }),
  metadataBase: new URL(site.url),
  title: { default: fullTitle, template: `%s — ${site.name}` },
  authors: [{ name: site.name, url: site.url }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="fixed top-0 left-0 z-50 -translate-y-full rounded-br bg-fg px-4 py-2 text-sm text-bg focus:translate-y-0 focus:text-bg"
        >
          Skip to main content
        </a>

        <div className="grid w-full max-w-[1200px] flex-1 grid-cols-1 px-5 pb-6 md:grid-cols-[110px_minmax(0,1fr)] md:px-16 md:py-12">
          <SiteNav />
          <main id="main-content" tabIndex={-1} className="min-w-0 pt-8 outline-none md:border-l md:border-rule md:pt-0 md:pl-10">
            {children}
          </main>
        </div>

        <footer className="px-5 pt-6 pb-8 text-center text-[0.72rem] text-muted italic">
          Inspired from shud.in and paco.me · © {year} {site.name}
        </footer>

        <AgentBridge />
      </body>
    </html>
  );
}
