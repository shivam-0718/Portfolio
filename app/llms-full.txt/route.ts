import { buildLlms, textResponse } from "@/lib/llms";

// /llms-full.txt: everything on the site in one Markdown file, for AI tools that read it whole.
export const dynamic = "force-static";

export function GET() {
  return textResponse(buildLlms({ full: true }));
}
