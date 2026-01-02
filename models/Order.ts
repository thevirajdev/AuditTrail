import mongoose, { Schema, Document } from 'mongoose';
import { ORDER_STATUSES, PAYMENT_METHODS, PAYMENT_STATUSES } from '@lib/constants';

export interface IOrderItem {
  menuItemId: Schema.Types.ObjectId;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface IDeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  items: IOrderItem[];
  deliveryAddress: IDeliveryAddress;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: (typeof PAYMENT_METHODS)[number];
  paymentStatus: (typeof PAYMENT_STATUSES)[number];
  orderStatus: (typeof ORDER_STATUSES)[number];
  estimatedDeliveryTime: number;
  notes?: string;
  appliedCoupon?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    menuItemId: {
      type: Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    specialInstructions: {
      type: String,
    },
  },
  { _id: false }
);

const DeliveryAddressSchema = new Schema<IDeliveryAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    coordinates: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [OrderItemSchema],
    deliveryAddress: {
      type: DeliveryAddressSchema,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: PAYMENT_METHODS,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUSES,
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ORDER_STATUSES,
      default: 'pending',
    },
    estimatedDeliveryTime: {
      type: Number,
      required: true,
      min: 0,
    },
    notes: {
      type: String,
    },
    appliedCoupon: {
      type: Schema.Types.ObjectId,
      ref: 'Offer',
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ userId: 1 });
OrderSchema.index({ orderStatus: 1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
