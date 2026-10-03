import type { Metadata } from "next";
import { OrderStatus } from "./order-status";
export const metadata: Metadata = { title: "Order status | SALT N’ PEP", robots: { index: false, follow: false }, referrer: "no-referrer" };
export default function ResultPage() { return <OrderStatus />; }
