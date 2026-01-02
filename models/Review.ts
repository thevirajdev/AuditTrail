import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  userId: Schema.Types.ObjectId;
  menuItemId: Schema.Types.ObjectId;
  orderId: Schema.Types.ObjectId;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  isApproved: boolean;
  isHelpful: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    menuItemId: {
      type: Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isHelpful: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ userId: 1 });
ReviewSchema.index({ menuItemId: 1 });
ReviewSchema.index({ isApproved: 1 });
ReviewSchema.index({ rating: -1 });
ReviewSchema.index({ isHelpful: -1 });

const Review = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
