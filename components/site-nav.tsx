"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui-sdk/react/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialIcon } from "@/components/icons";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeSwitch } from "@/components/theme-switch";
import { navItems, site, socials } from "@/content/site";
import { isActive } from "@/lib/is-active";

export function SiteNav({ year }: { year: number }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-20 -mx-5 border-b border-line bg-bg/95 px-5 py-3 backdrop-blur-sm md:top-12 md:mx-0 md:h-[calc(100dvh-6rem)] md:border-0 md:bg-transparent md:px-0 md:py-0 md:pr-6 md:backdrop-blur-none">
      <div className="flex items-center justify-between md:h-full md:flex-col md:items-stretch md:justify-start">
        <Link href="/" className="text-[0.95rem] font-semibold text-fg hover:text-muted md:hidden">
          {site.name}
        </Link>

        <NavigationMenu aria-label="Main navigation" orientation="vertical" className="hidden md:block">
          <NavigationMenuList className="flex flex-col gap-1.5 text-right">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  render={<Link href={item.href} />}
                  current={isActive(pathname, item.href)}
                  className="block py-0.5 text-[0.88rem] text-muted italic transition-colors hover:text-fg data-current:font-semibold data-current:text-fg"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-3 md:mt-auto md:flex-col md:items-end md:gap-3 md:pt-8">
          <div className="flex items-center gap-3 md:gap-2.5">
            <div className="hidden items-center md:flex">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in new tab)`}
                  className="flex size-6 items-center justify-center text-muted transition-colors hover:text-fg"
                >
                  <SocialIcon name={social.name} className="size-3.5" />
                </a>
              ))}
            </div>
            <ThemeSwitch />
            <MobileMenu />
          </div>
          {/* items-end lets a line wider than the 110px column spill into the left page padding. */}
          <p className="hidden flex-col items-end text-[0.68rem] leading-snug whitespace-nowrap text-muted italic md:flex">
            <span>Inspired from shud.in</span>
            <span>and paco.me</span>
            <span>
              © {year} {site.name}
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
}
