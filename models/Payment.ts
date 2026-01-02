import mongoose, { Schema, Document } from 'mongoose';
import { PAYMENT_STATUSES } from '@lib/constants';

export interface IPayment extends Document {
  orderId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  amount: number;
  currency: string;
  method: 'stripe' | 'razorpay' | 'paypal';
  transactionId: string;
  status: (typeof PAYMENT_STATUSES)[number];
  receipt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      required: true,
    },
    method: {
      type: String,
      enum: ['stripe', 'razorpay', 'paypal'],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: PAYMENT_STATUSES,
      default: 'pending',
    },
    receipt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

PaymentSchema.index({ orderId: 1 });
PaymentSchema.index({ userId: 1 });
PaymentSchema.index({ transactionId: 1 });
PaymentSchema.index({ status: 1 });

const Payment = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;
