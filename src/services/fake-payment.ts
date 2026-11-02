import { PaymentResult, PaymentScenario, PaymentMethodType } from "@/types/payment";

/**
 * Generates a unique transaction identifier
 */
function generateTransactionId(): string {
  const randomPart = Math.random().toString(36).substring(2, 9).toUpperCase();
  const timestamp = Date.now().toString().slice(-4);
  return `TXN-DEMO-${randomPart}-${timestamp}`;
}

/**
 * Simulates an asynchronous payment gateway transaction with delay and predictable scenarios.
 * Note: DEMO ONLY — completely frontend simulated.
 */
export async function simulatePayment(
  amount: number,
  scenario: PaymentScenario = "success",
  options?: {
    orderId?: string;
    paymentMethod?: PaymentMethodType;
    delayMs?: number;
  }
): Promise<PaymentResult> {
  const delay = options?.delayMs ?? 1500;
  const orderId = options?.orderId ?? `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  // Simulate gateway roundtrip delay
  await new Promise((resolve) => setTimeout(resolve, delay));

  const createdAt = new Date().toISOString();
  const transactionId = generateTransactionId();

  if (scenario === "success") {
    return {
      transactionId,
      orderId,
      status: "success",
      amount,
      message: "Payment authorized and captured successfully via simulated demo gateway.",
      createdAt,
      paymentMethod: options?.paymentMethod || "card",
    };
  }

  if (scenario === "failure") {
    return {
      transactionId,
      orderId,
      status: "failed",
      amount,
      message: "Transaction declined: Card issuer returned error 'ERR_SIMULATED_DECLINE_05' (Do Not Honor).",
      createdAt,
      paymentMethod: options?.paymentMethod || "card",
    };
  }

  // Cancel scenario
  return {
    transactionId,
    orderId,
    status: "cancelled",
    amount,
    message: "Transaction was cancelled by user before authorization was completed.",
    createdAt,
    paymentMethod: options?.paymentMethod || "card",
  };
}

