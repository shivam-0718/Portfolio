"use client";

import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@ui-sdk/react/drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialIcon } from "@/components/icons";
import { navItems, socials } from "@/content/site";
import { isActive } from "@/lib/is-active";

export function MobileMenu() {
  const pathname = usePathname();

  return (
    <Drawer side="right" preventEdgeSwipe>
      <DrawerTrigger className="-mr-1 cursor-pointer rounded px-1 py-1 text-[0.95rem] text-fg italic transition-colors hover:text-muted md:hidden">
        Menu
      </DrawerTrigger>
      <DrawerBackdrop className="fixed inset-0 bg-black/30" />
      <DrawerContent className="flex h-dvh w-64 max-w-[80vw] flex-col overscroll-contain border-l border-line bg-bg px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <DrawerTitle className="mb-6 text-xs font-medium tracking-[0.08em] text-muted uppercase">
          Menu
        </DrawerTitle>
        {/* Agents use the sidebar's copy of these links, so this one stays out of the snapshot. */}
        <div data-agent-hidden className="flex flex-1 flex-col">
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <DrawerClose
                      render={<Link href={item.href} aria-current={active ? "page" : undefined} />}
                      className="block text-lg text-muted italic hover:text-fg aria-[current=page]:font-semibold aria-[current=page]:text-fg"
                    >
                      {item.label}
                    </DrawerClose>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-auto flex items-center gap-4 border-t border-line pt-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (opens in new tab)`}
                className="flex size-8 items-center justify-center text-muted hover:text-fg"
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
