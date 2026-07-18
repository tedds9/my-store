import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import { Merchandise } from './models/Merchandise.js';

dotenv.config({ path: '.env.local'});

const app = express();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
const allowedOrigin = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
connectDatabase();
app.post('/api/checkout', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Malformed requestion payload: items array is required.'});
    }

    const lineItems = await Promise.all(items.map(async (clientItem) => {
      const dbProduct = await Merchandise.findOne({ id: clientItem.id });
      
      if (!dbProduct) {
        throw new Error(`Product mapping failed: ID ${clientItem.id} not found.`);
      }

      return {
        price_data: {
        currency: 'usd',
        product_data: {
          name: `${dbProduct.name} (Size: ${clientItem.selectedSize})`,
          images: dbProduct.image && (dbProduct.image.startsWith('http')) ? [dbProduct.image] : [],
        },
        unit_amount: Math.round(dbProduct.price * 100),
      },
      quantity: clientItem.quantity,
    };
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/`,
    });

    res.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error('Stripe Server Error:', error);
    res.status(500).json({ error: error.message });
  }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Stripe Sandbox Backend Online on port: ${PORT}`));