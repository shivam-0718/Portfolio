import { ViewTransition } from "react";

// A template remounts on every navigation (a layout doesn't), so its <ViewTransition> sees the
// old page exit and the new page enter. The "page" class is animated in globals.css: a short
// blur-fade like shud.in. Next.js runs route changes as transitions, so this needs no other wiring.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
