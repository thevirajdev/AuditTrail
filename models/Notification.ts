import mongoose, { Schema, Document } from 'mongoose';
import { NOTIFICATION_TYPES } from '@lib/constants';

export interface INotification extends Document {
  userId: Schema.Types.ObjectId;
  type: (typeof NOTIFICATION_TYPES)[number];
  title: string;
  message: string;
  orderId?: Schema.Types.ObjectId;
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: NOTIFICATION_TYPES,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

NotificationSchema.index({ userId: 1, isRead: 1 });
NotificationSchema.index({ createdAt: -1 });
NotificationSchema.index({ userId: 1, createdAt: -1 });

const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
