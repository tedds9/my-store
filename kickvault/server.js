import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local'});

const app = express();
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
const allowedOrigin = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.post('/api/checkout', async (req, res) => {
  try {
    const { items } = req.body;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${item.name} (Size: ${item.selectedSize})`,
          images: item.image && (item.image.startsWith('http')) ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

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