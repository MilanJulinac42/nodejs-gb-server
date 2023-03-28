import { Request, Response } from 'express';
import { IUser, IUserModel } from '../models/User.model';
import { createPaymentIntent } from '../services/stripe.service';

interface AuthRequest extends Request {
  user?: IUser;
}

export async function handleCreatePaymentIntent(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { amount, currency, paymentMethodId } = req.body;
    const user = req.user as IUserModel; // Assuming you have user context available in req.user

    if (!user.stripeCustomerId) {
      await user.createStripeCustomer(); // Create a Stripe customer for the user if it doesn't exist
    }

    const paymentResult = await user.createPayment(amount, currency, paymentMethodId);

    if (paymentResult.success) {
      res.status(200).json({ message: 'Payment successful', paymentIntent: paymentResult.paymentIntent });
    } else {
      res.status(400).json({ message: 'Payment failed', error: paymentResult.error });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
