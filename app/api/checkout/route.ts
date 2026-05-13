import { NextResponse } from "next/server";
import { SITE } from "@/lib/utils";

interface CheckoutItem {
  stadiumSlug: string | null;
  stadiumName: string;
  productSlug: string;
  frameColorLabel: string;
  sizeLabel: string;
  priceGbp: number;
  qty: number;
  personalisation?: string;
  hasCustomImage?: boolean;
}

interface CheckoutBody {
  items: CheckoutItem[];
}

// POST /api/checkout
// Body: { items: CheckoutItem[] }
// Returns: { url: string }  — redirect target (Stripe-hosted, or stub success page)
//
// Stripe SDK isn't installed yet. When STRIPE_SECRET_KEY arrives:
//   1. npm i stripe
//   2. Replace the stub branch with stripe.checkout.sessions.create({...})
//   3. Map our CheckoutItem[] to line_items
//   4. Mirror Stripe's webhook in app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "empty_cart" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    // Stub: act as if Stripe accepted the session and bounce to the success page.
    return NextResponse.json({
      url: `${SITE.url}/checkout/success?stub=1`,
      stub: true,
    });
  }

  // Real Stripe Checkout integration goes here. Pseudo:
  //
  //   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "..." });
  //   const session = await stripe.checkout.sessions.create({
  //     mode: "payment",
  //     payment_method_types: ["card"],
  //     line_items: body.items.map((it) => ({
  //       quantity: it.qty,
  //       price_data: {
  //         currency: "gbp",
  //         unit_amount: it.priceGbp * 100,
  //         product_data: {
  //           name: `${it.stadiumName} — ${it.frameColorLabel} ${it.sizeLabel}`,
  //           metadata: {
  //             stadium: it.stadiumSlug ?? "custom",
  //             product: it.productSlug,
  //             personalisation: it.personalisation ?? "",
  //             custom_image: it.hasCustomImage ? "1" : "0",
  //           },
  //         },
  //       },
  //     })),
  //     success_url: `${SITE.url}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
  //     cancel_url: `${SITE.url}/checkout/cancel`,
  //   });
  //   return NextResponse.json({ url: session.url });

  return NextResponse.json(
    { error: "stripe_sdk_not_installed" },
    { status: 501 }
  );
}
