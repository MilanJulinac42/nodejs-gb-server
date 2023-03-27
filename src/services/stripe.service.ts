import Stripe from 'stripe';

const stripe = new Stripe('your_stripe_secret_key', {
  apiVersion: "2022-11-15",
});

export async function createPaymentIntent(amount: number, currency: string = 'usd'): Promise<Stripe.PaymentIntent> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(String(amount)),
      currency,
    });

    return paymentIntent;
  } catch (error) {
    throw new Error("Error creating payment intent");
  }
}
