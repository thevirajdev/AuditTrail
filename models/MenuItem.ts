import mongoose, { Schema, Document } from 'mongoose';

export interface INutrition {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
}

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  discount: number;
  category: Schema.Types.ObjectId;
  image: string;
  images3D?: string;
  ingredients: string[];
  nutrition?: INutrition;
  tags: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NutritionSchema = new Schema<INutrition>(
  {
    calories: { type: Number, min: 0 },
    protein: { type: Number, min: 0 },
    carbs: { type: Number, min: 0 },
    fat: { type: Number, min: 0 },
    fiber: { type: Number, min: 0 },
  },
  { _id: false }
);

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    images3D: {
      type: String,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    nutrition: {
      type: NutritionSchema,
    },
    tags: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

MenuItemSchema.index({ name: 'text', description: 'text', ingredients: 'text' });
MenuItemSchema.index({ category: 1 });
MenuItemSchema.index({ isAvailable: 1, isFeatured: 1 });
MenuItemSchema.index({ tags: 1 });

const MenuItem = mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);

export default MenuItem;
