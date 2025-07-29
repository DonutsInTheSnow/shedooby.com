import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not defined");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-06-30.basil",
    });

    const { cart } = await req.json();
    console.log("Received cart:", cart);

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      console.log("Cart validation failed");
      return NextResponse.json({ error: "Invalid or empty cart" }, { status: 400 });
    }

    const lineItems = cart.map((item) => ({
      price: item.price_id,
      quantity: item.quantity,
    }));
    console.log("Line items:", lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: process.env.NODE_ENV === "production"
        // ? "https://shedooby.vercel.app/success"
        ? "https://shedooby.com/success"
        : "http://localhost:3000/success",
      cancel_url: process.env.NODE_ENV === "production"
        // ? "https://shedooby.vercel.app/merch"
        ? "https://shedooby.com/merch"
        : "http://localhost:3000/merch",
    });
    console.log("Stripe session created:", session);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}