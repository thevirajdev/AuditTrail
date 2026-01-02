export interface User {
  _id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  avatar?: string;
  addresses: Address[];
  wallet: {
    balance: number;
    transactions: string[];
  };
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
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

export interface Nutrition {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  categoryName?: string;
  image: string;
  images3D?: string;
  ingredients: string[];
  nutrition?: Nutrition;
  tags: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  order: number;
  createdAt: Date;
}

export interface OrderItem {
  menuItemId: string;
  menuItemName?: string;
  menuItemImage?: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Order {
  _id: string;
  userId: string;
  userName?: string;
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: 'card' | 'wallet' | 'upi' | 'cash';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  estimatedDeliveryTime: number;
  notes?: string;
  appliedCoupon?: string;
  appliedCouponCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  _id: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  menuItemId: string;
  menuItemName?: string;
  orderId: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  isApproved: boolean;
  isHelpful: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  _id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  method: 'stripe' | 'razorpay' | 'paypal';
  transactionId: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  receipt?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Offer {
  _id: string;
  title: string;
  description: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minOrderValue: number;
  maxUses?: number;
  usedCount: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  applicableCategories: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin {
  _id: string;
  userId: string;
  email?: string;
  name?: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  _id: string;
  userId: string;
  type: 'order_placed' | 'order_confirmed' | 'order_delivered' | 'review_approved' | 'offer_available';
  title: string;
  message: string;
  orderId?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalMenuItems: number;
  pendingOrders: number;
  todayOrders: number;
  todayRevenue: number;
  popularItems: { name: string; count: number }[];
  recentOrders: Order[];
}
