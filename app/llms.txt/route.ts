import { buildLlms, textResponse } from "@/lib/llms";

// /llms.txt (llmstxt.org): a short index of the site for AI assistants and answer engines.
export const dynamic = "force-static";

export function GET() {
  return textResponse(buildLlms({ full: false }));
}
