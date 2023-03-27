import { Request, Response } from 'express';
import { createPaymentIntent } from '../services/stripe.service';

export async function handleCreatePaymentIntent(req: Request, res: Response): Promise<void> {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await createPaymentIntent(amount, currency);

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
