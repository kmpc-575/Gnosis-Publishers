import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const PaymentStatus: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'pending'>('loading');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const checkStatus = async () => {
      if (!orderId) {
        setStatus('failed');
        return;
      }

      try {
        const response = await fetch(`/api/order-status/${orderId}`);
        const data = await response.json();
        setOrderDetails(data);

        if (data.order_status === 'PAID') {
          setStatus('success');
        } else if (data.order_status === 'ACTIVE') {
          setStatus('pending');
        } else {
          setStatus('failed');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('failed');
      }
    };

    checkStatus();
  }, [orderId]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-surface-container-lowest p-10 rounded-2xl shadow-xl border border-outline-variant/10 text-center"
      >
        {status === 'loading' && (
          <div className="space-y-6">
            <Loader2 className="mx-auto animate-spin text-primary" size={64} />
            <h2 className="text-2xl font-serif">Verifying Payment...</h2>
            <p className="text-on-surface-variant">Please wait while we confirm your transaction with Cashfree.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6">
            <CheckCircle className="mx-auto text-emerald-500" size={64} />
            <h2 className="text-3xl font-serif text-on-surface">Payment Successful!</h2>
            <p className="text-on-surface-variant">Thank you for your purchase. Your order <strong>{orderId}</strong> has been processed successfully.</p>
            <div className="bg-surface-container p-4 rounded-lg text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Amount Paid:</span>
                <span className="font-bold">₹{orderDetails?.order_amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Transaction ID:</span>
                <span className="font-mono">{orderDetails?.cf_order_id}</span>
              </div>
            </div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:bg-primary-container transition-all"
            >
              Back to Home <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {status === 'failed' && (
          <div className="space-y-6">
            <XCircle className="mx-auto text-error" size={64} />
            <h2 className="text-3xl font-serif text-on-surface">Payment Failed</h2>
            <p className="text-on-surface-variant">We couldn't process your payment. If any amount was deducted, it will be refunded automatically.</p>
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:bg-primary-container transition-all"
              >
                Try Again
              </Link>
              <Link to="/contact" className="text-primary font-bold text-sm">Contact Support</Link>
            </div>
          </div>
        )}

        {status === 'pending' && (
          <div className="space-y-6">
            <Loader2 className="mx-auto animate-spin text-amber-500" size={64} />
            <h2 className="text-3xl font-serif text-on-surface">Payment Pending</h2>
            <p className="text-on-surface-variant">Your payment is being processed. This might take a few minutes.</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-bold hover:bg-primary-container transition-all"
            >
              Back to Home <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentStatus;
