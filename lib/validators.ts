import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const menuItemSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Invalid image URL'),
  ingredients: z.array(z.string()).min(1, 'At least one ingredient is required'),
  nutrition: z.object({
    calories: z.number().min(0).optional(),
    protein: z.number().min(0).optional(),
    carbs: z.number().min(0).optional(),
    fat: z.number().min(0).optional(),
    fiber: z.number().min(0).optional(),
  }).optional(),
  tags: z.array(z.string()).optional(),
  stock: z.number().min(0).default(0),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug is required'),
  icon: z.string().optional(),
  description: z.string().optional(),
  order: z.number().min(0).default(0),
});

export const orderSchema = z.object({
  items: z.array(z.object({
    menuItemId: z.string(),
    quantity: z.number().min(1),
    specialInstructions: z.string().optional(),
  })).min(1, 'At least one item is required'),
  deliveryAddress: z.object({
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(5, 'ZIP code is required'),
  }),
  paymentMethod: z.enum(['card', 'wallet', 'upi', 'cash']),
  notes: z.string().optional(),
  appliedCoupon: z.string().optional(),
});

export const reviewSchema = z.object({
  menuItemId: z.string(),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
  images: z.array(z.string().url()).optional(),
});

export const offerSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description is required'),
  code: z.string().min(3, 'Coupon code must be at least 3 characters'),
  discountType: z.enum(['percentage', 'fixed']),
  discountValue: z.number().min(0, 'Discount value must be positive'),
  maxDiscount: z.number().min(0).optional(),
  minOrderValue: z.number().min(0).default(0),
  maxUses: z.number().min(1).optional(),
  validFrom: z.string().or(z.date()),
  validUntil: z.string().or(z.date()),
  isActive: z.boolean().default(true),
  applicableCategories: z.array(z.string()).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type MenuItemInput = z.infer<typeof menuItemSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type OfferInput = z.infer<typeof offerSchema>;
