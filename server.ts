import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { Cashfree } from 'cashfree-pg';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Cashfree
(Cashfree as any).XClientId = process.env.CASHFREE_APP_ID || '';
(Cashfree as any).XClientSecret = process.env.CASHFREE_SECRET_KEY || '';
(Cashfree as any).XEnvironment = process.env.CASHFREE_ENVIRONMENT === 'production' 
  ? (Cashfree as any).Environment.PRODUCTION 
  : (Cashfree as any).Environment.SANDBOX;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/create-order', async (req, res) => {
    try {
      const { amount, customerId, customerPhone, customerEmail, orderId, orderNote } = req.body;

      if (!amount || !customerId || !customerPhone || !customerEmail) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const request = {
        order_amount: amount,
        order_currency: 'INR',
        order_id: orderId || `order_${Date.now()}`,
        customer_details: {
          customer_id: customerId,
          customer_phone: customerPhone,
          customer_email: customerEmail,
        },
        order_meta: {
          return_url: `${req.protocol}://${req.get('host')}/payment-status?order_id={order_id}`,
          notify_url: `${req.protocol}://${req.get('host')}/api/webhook/cashfree`,
        },
        order_note: orderNote || 'Purchase from Gnosis Publishers',
      };

      const response = await (Cashfree as any).PGCreateOrder('2023-08-01', request);
      res.json(response.data);
    } catch (error: any) {
      console.error('Cashfree Error:', error.response?.data || error.message);
      res.status(500).json({ error: error.response?.data?.message || 'Failed to create order' });
    }
  });

  app.get('/api/order-status/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
      const response = await (Cashfree as any).PGFetchOrder('2023-08-01', orderId);
      res.json(response.data);
    } catch (error: any) {
      console.error('Cashfree Fetch Error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to fetch order status' });
    }
  });

  // Webhook handler (optional but good practice)
  app.post('/api/webhook/cashfree', (req, res) => {
    // Verify signature and update database
    console.log('Cashfree Webhook received:', req.body);
    res.status(200).send('OK');
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
