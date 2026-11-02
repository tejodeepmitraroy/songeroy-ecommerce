import type { Metadata } from "next";
import { OrderSuccessClient } from "./OrderSuccessClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ orderId: string }>;
}): Promise<Metadata> {
  const { orderId } = await params;
  return {
    title: `Order ${orderId} Confirmed`,
    description: "Your demo order details and simulated invoice.",
  };
}

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return <OrderSuccessClient orderId={orderId} />;
}

