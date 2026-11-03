import { handleEnquiry } from "@/lib/enquiry-handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request, ctx: { params: Promise<{ type: string }> }) {
  const { type } = await ctx.params;
  return handleEnquiry(req, type);
}

export function GET() {
  return Response.json({ ok: false, message: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
