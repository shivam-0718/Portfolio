import { render, screen } from "@testing-library/react";
import { createAgent } from "@ui-sdk/react/agent";
import { forwardRef } from "react";
import { expect, test, vi } from "vitest";
import { SiteNav } from "@/components/site-nav";

vi.mock("next/navigation", () => ({ usePathname: () => "/experience/" }));
vi.mock("next/link", () => ({
  default: forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(function Link(props, ref) {
    return <a ref={ref} {...props} />;
  }),
}));

const agent = createAgent();

test("an agent can read the nav, switch the theme and open the menu", async () => {
  document.documentElement.dataset.theme = "light";
  render(<SiteNav />);

  const components = agent.snapshot().filter((entry) => !entry.offPage && entry.component !== "more");
  for (const entry of components) {
    expect(entry.label, `${entry.component} ${entry.ref} has no name`).toBeTruthy();
  }
  const labels = components.map((entry) => entry.label);
  for (const label of ["Main navigation", "Dark mode", "Menu"]) {
    expect(labels, `${label} is missing from the snapshot`).toContain(label);
  }

  const nav = components.find((entry) => entry.label === "Main navigation");
  expect(nav?.items?.map((item) => item.label)).toEqual(["About me", "Experience", "Thoughts", "Projects"]);
  expect(screen.getByRole("link", { name: "Experience" }).getAttribute("aria-current")).toBe("page");
  expect(screen.getByRole("link", { name: "About me" }).hasAttribute("aria-current")).toBe(false);

  const toDark = await agent.act({ steps: [{ ref: "Dark mode", action: "setChecked", args: [true] }] });
  expect(toDark.ok, toDark.error?.message).toBe(true);
  expect(document.documentElement.dataset.theme).toBe("dark");
  expect(localStorage.getItem("theme")).toBe("dark");

  const toLight = await agent.act({ steps: [{ ref: "Dark mode", action: "setChecked", args: [false] }] });
  expect(toLight.ok, toLight.error?.message).toBe(true);
  expect(document.documentElement.dataset.theme).toBe("light");

  const menu = await agent.act({ steps: [{ ref: "Menu", action: "press" }] });
  expect(menu.ok, menu.error?.message).toBe(true);
  expect(await screen.findByRole("dialog", { name: "Menu" })).toBeTruthy();
});
