import type { Metadata } from "next";
import { CheckoutForm } from "./checkout-form";
export const metadata: Metadata = { title: "Checkout | SALT N’ PEP", robots: { index: false, follow: false } };
export default function CheckoutPage() { return <CheckoutForm />; }
