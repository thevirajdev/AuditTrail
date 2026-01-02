import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface IUser extends Document {
  email: string;
  phone?: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  avatar?: string;
  addresses: IAddress[];
  wallet: {
    balance: number;
    transactions: Schema.Types.ObjectId[];
  };
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema<IAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
    coordinates: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
    },
    addresses: [AddressSchema],
    wallet: {
      balance: {
        type: Number,
        default: 0,
      },
      transactions: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Transaction',
        },
      ],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
