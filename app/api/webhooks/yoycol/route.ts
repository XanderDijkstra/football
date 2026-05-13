import { NextResponse } from "next/server";

// Yoycol → us. Order status updates land here.
// Once webhook signatures are documented, verify them before trusting the body.

export async function POST(req: Request) {
  const raw = await req.text();
  let payload: unknown = null;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // TODO: verify signature header once Yoycol publishes their HMAC scheme.
  // For now we just acknowledge so the integration can be wired end-to-end.

  console.log("[yoycol-webhook]", payload);

  return NextResponse.json({ received: true });
}
