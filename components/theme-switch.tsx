"use client";

import { Switch, SwitchThumb } from "@ui-sdk/react/switch";
import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.dataset.theme === "dark";

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

export function ThemeSwitch() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  useEffect(() => {
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.setAttribute("content", dark ? "#111111" : "#fafaf8");
    }
  }, [dark]);

  return (
    <label className="inline-flex cursor-pointer items-center">
      <span className="sr-only">Dark mode</span>
      <Switch
        checked={dark}
        onCheckedChange={(next) => setTheme(next ? "dark" : "light")}
        // Styled from data-theme, not data-checked: the server renders unchecked, and the
        // pre-paint theme script already knows the answer, so the thumb never jumps on load.
        className="relative inline-flex h-[18px] w-8 shrink-0 cursor-pointer items-center rounded-full bg-switch-off transition-colors duration-200 dark:bg-accent"
      >
        <SwitchThumb className="block size-3.5 translate-x-0.5 rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.25)] transition-transform duration-200 dark:translate-x-4" />
      </Switch>
    </label>
  );
}
