declare global {
  interface Window {
    Cashfree: any;
  }
}

export interface PaymentDetails {
  amount: number;
  customerId: string;
  customerPhone: string;
  customerEmail: string;
  orderNote?: string;
  orderId?: string;
}

export class PaymentService {
  private static cashfree: any;

  private static async initCashfree() {
    if (!this.cashfree) {
      // The script is loaded in index.html, so window.Cashfree should be available
      const isSandbox = import.meta.env.VITE_CASHFREE_MODE !== 'production';
      this.cashfree = window.Cashfree({
        mode: isSandbox ? "sandbox" : "production"
      });
    }
    return this.cashfree;
  }

  static async initiatePayment(details: PaymentDetails) {
    try {
      const cashfree = await this.initCashfree();

      // 1. Create order on our backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const orderData = await response.json();

      // 2. Open Cashfree Checkout
      const checkoutOptions = {
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_self", // or "_modal"
      };

      return cashfree.checkout(checkoutOptions);
    } catch (error) {
      console.error('Payment initiation failed:', error);
      throw error;
    }
  }

  static parsePrice(priceStr: string): number {
    const numeric = priceStr.replace(/[^0-9.]/g, '');
    return parseFloat(numeric) || 0;
  }
}
