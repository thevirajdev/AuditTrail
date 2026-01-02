import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  userId: Schema.Types.ObjectId;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'moderator'],
      default: 'moderator',
      required: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.index({ userId: 1 });
AdminSchema.index({ role: 1 });

const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
