import mongoose, { Schema, Document } from 'mongoose';
import { DISCOUNT_TYPES } from '@lib/constants';

export interface IOffer extends Document {
  title: string;
  description: string;
  code: string;
  discountType: (typeof DISCOUNT_TYPES)[number];
  discountValue: number;
  maxDiscount?: number;
  minOrderValue: number;
  maxUses?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicableCategories: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema = new Schema<IOffer>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: DISCOUNT_TYPES,
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    maxDiscount: {
      type: Number,
      min: 0,
    },
    minOrderValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxUses: {
      type: Number,
      min: 1,
    },
    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicableCategories: {
      type: [Schema.Types.ObjectId],
      ref: 'Category',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

OfferSchema.index({ code: 1 });
OfferSchema.index({ isActive: 1, validFrom: 1, validUntil: 1 });
OfferSchema.index({ validFrom: 1, validUntil: 1 });

const Offer = mongoose.models.Offer || mongoose.model<IOffer>('Offer', OfferSchema);

export default Offer;
