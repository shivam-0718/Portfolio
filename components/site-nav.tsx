"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui-sdk/react/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Monogram, SocialIcon } from "@/components/icons";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeSwitch } from "@/components/theme-switch";
import { navItems, site, socials } from "@/content/site";
import { isActive } from "@/lib/is-active";

// One header for both breakpoints, so the theme switch and nav exist once in the DOM
// (the agent bridge needs unique labels).
export function SiteNav() {
  const pathname = usePathname();
  const onAbout = pathname === "/";

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-3 md:h-16 md:px-8 md:py-0">
        {/* The About page's own heading is the name, so on desktop the bar shows the monogram instead. */}
        <Link
          href="/"
          className={`text-[0.95rem] font-semibold tracking-tight text-foreground transition-colors hover:text-link ${onAbout ? "md:hidden" : ""}`}
        >
          {site.name}
        </Link>
        {onAbout && (
          <Link
            href="/"
            aria-label={`${site.name}, home`}
            className="hidden text-foreground transition-opacity hover:opacity-80 md:block"
          >
            <Monogram />
          </Link>
        )}

        <div className="flex items-center gap-3 md:ml-auto md:gap-4 lg:gap-6">
          <NavigationMenu aria-label="Main navigation" className="hidden md:block">
            <NavigationMenuList className="flex items-center gap-4 lg:gap-6">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    render={<Link href={item.href} />}
                    current={isActive(pathname, item.href)}
                    className="text-[0.875rem] text-muted-foreground transition-colors hover:text-foreground data-current:font-medium data-current:text-foreground"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-3 md:gap-2">
            <div className="hidden items-center gap-2 md:flex">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in new tab)`}
                  className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <SocialIcon name={social.name} className="size-3.5" />
                </a>
              ))}
            </div>
            <span className="flex md:ml-1.5">
              <ThemeSwitch />
            </span>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
