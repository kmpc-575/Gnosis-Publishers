export interface PaymentDetails {
  amount: number;
  customerId: string;
  customerPhone: string;
  customerEmail: string;
  orderNote?: string;
  orderId?: string;
}

export class PaymentService {
  static async initiatePayment(details: PaymentDetails) {
    alert("Payment integration is currently disabled. Please try again later.");
    return;
  }

  static parsePrice(priceStr: string): number {
    const numeric = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(numeric) || 0;
  }
}
