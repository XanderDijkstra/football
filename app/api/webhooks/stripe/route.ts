import { NextResponse } from "next/server";

// Stripe → us. When checkout.session.completed lands here, we'll push the
// order to Yoycol via lib/yoycol/client. Stub today; the real flow is gated
// on STRIPE_WEBHOOK_SECRET and the Stripe SDK.

export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.log("[stripe-webhook:stub]", { sig, bytes: raw.length });
    return NextResponse.json({ received: true, stub: true });
  }

  // Real verification needs the Stripe SDK:
  //
  //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  //   const event = stripe.webhooks.constructEvent(
  //     raw, sig!, process.env.STRIPE_WEBHOOK_SECRET!
  //   );
  //   if (event.type === "checkout.session.completed") {
  //     const session = event.data.object as Stripe.Checkout.Session;
  //     await yoycol.createOrder(composeYoycolOrder(session));
  //   }

  console.warn(
    "[stripe-webhook] STRIPE_WEBHOOK_SECRET set but Stripe SDK not installed yet."
  );
  return NextResponse.json({ received: true, sdkMissing: true });
}
