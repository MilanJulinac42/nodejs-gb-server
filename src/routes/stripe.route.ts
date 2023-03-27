import express from 'express';
import { handleCreatePaymentIntent } from '../conrollers/stripe.contoller';

const router = express.Router();

router.post('/create-payment-intent', handleCreatePaymentIntent);

export default router;
