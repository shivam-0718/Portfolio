"use client";

import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@ui-sdk/react/drawer";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialIcon } from "@/components/icons";
import { navItems, socials } from "@/content/site";
import { isActive } from "@/lib/is-active";

export function MobileMenu() {
  const pathname = usePathname();

  return (
    <Drawer side="right" preventEdgeSwipe>
      <DrawerTrigger className="-mr-1 flex cursor-pointer items-center gap-1.5 rounded-lg px-1 py-1 text-[0.95rem] text-foreground italic transition-colors hover:text-link md:hidden">
        Menu
        <MenuIcon aria-hidden="true" strokeWidth={1.75} className="size-4" />
      </DrawerTrigger>
      <DrawerBackdrop className="fixed inset-0 bg-black/30" />
      <DrawerContent className="flex h-dvh w-64 max-w-[80vw] flex-col overscroll-contain border-l border-sidebar-border bg-sidebar px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sidebar-foreground">
        <div className="mb-6 flex items-center justify-between">
          <DrawerTitle className="text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">Menu</DrawerTitle>
          <DrawerClose
            aria-label="Close menu"
            className="-mr-1.5 flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <XIcon aria-hidden="true" strokeWidth={1.75} className="size-4" />
          </DrawerClose>
        </div>
        {/* Agents use the sidebar's copy of these links, so this one stays out of the snapshot. */}
        <div data-agent-hidden className="flex flex-1 flex-col">
          <nav aria-label="Mobile navigation">
            <ul className="-mx-2 flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <DrawerClose
                      render={<Link href={item.href} aria-current={active ? "page" : undefined} />}
                      className="group flex items-center gap-3 rounded-lg px-2 py-2 text-lg text-muted-foreground italic transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground aria-[current=page]:bg-sidebar-accent aria-[current=page]:font-semibold aria-[current=page]:text-sidebar-accent-foreground"
                    >
                      <item.icon
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="size-4.5 shrink-0 group-aria-[current=page]:text-link"
                      />
                      {item.label}
                    </DrawerClose>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-auto flex items-center gap-4 border-t border-sidebar-border pt-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in new tab)`}
                className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <SocialIcon name={social.name} className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
