export type PaymentStatus =
  | "pending"
  | "processing"
  | "success"
  | "failed"
  | "cancelled";

export type PaymentMethodType = "card" | "upi" | "cod";

export interface PaymentResult {
  transactionId: string;
  orderId: string;
  status: PaymentStatus;
  amount: number;
  message: string;
  createdAt: string;
  paymentMethod?: PaymentMethodType;
}

export type PaymentScenario = "success" | "failure" | "cancel";

