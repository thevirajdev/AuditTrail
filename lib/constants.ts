export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'out_for_delivery',
  'delivered',
  'cancelled',
] as const;

export const PAYMENT_METHODS = ['card', 'wallet', 'upi', 'cash'] as const;

export const PAYMENT_STATUSES = ['pending', 'completed', 'failed', 'refunded'] as const;

export const USER_ROLES = ['user', 'admin'] as const;

export const ADMIN_ROLES = ['super_admin', 'admin', 'moderator'] as const;

export const NOTIFICATION_TYPES = [
  'order_placed',
  'order_confirmed',
  'order_delivered',
  'review_approved',
  'offer_available',
] as const;

export const DISCOUNT_TYPES = ['percentage', 'fixed'] as const;

export const MENU_TAGS = ['veg', 'non-veg', 'spicy', 'gluten-free', 'dairy-free', 'keto', 'vegan'];

export const DEFAULT_DELIVERY_FEE = 5.0;
export const DEFAULT_TAX_RATE = 0.08;
export const MIN_ORDER_VALUE = 10.0;
