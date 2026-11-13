"use client";

import { useEffect } from "react";

type AgentModule = typeof import("@ui-sdk/react/agent");

let bridge: Promise<{ mod: AgentModule; agent: ReturnType<AgentModule["createAgent"]> }> | undefined;

export function AgentBridge() {
  useEffect(() => {
    let unregister: (() => void) | undefined;
    let cancelled = false;

    bridge ??= import("@ui-sdk/react/agent").then((mod) => ({
      mod,
      agent: mod.createAgent({ allow: () => true }),
    }));

    bridge.then(({ mod, agent }) => {
      if (!cancelled) unregister = mod.registerTools(agent, { allow: () => true });
    });

    return () => {
      cancelled = true;
      unregister?.();
    };
  }, []);

  return null;
}
