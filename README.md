# Restaurant Platform

A production-ready Next.js 14 restaurant ordering platform with MongoDB, JWT authentication, and complete admin dashboard. Built with TypeScript, Tailwind CSS, and modern React patterns.

## Features

- **User Authentication**: JWT-based authentication with secure HttpOnly cookies
- **Role-Based Access Control**: User and Admin roles with protected routes
- **Menu Management**: Full CRUD operations for menu items and categories
- **Order System**: Complete order lifecycle from placement to delivery
- **Shopping Cart**: Persistent cart functionality with localStorage
- **Payment Integration**: Support for multiple payment methods (Card, UPI, Wallet, Cash)
- **Reviews & Ratings**: User reviews with moderation
- **Admin Dashboard**: Analytics, order management, and user management
- **Offers & Coupons**: Discount code system with validation
- **Notifications**: In-app notification system

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion, GSAP
- **3D Graphics**: Three.js, React Three Fiber
- **UI Components**: Radix UI, ShadCN UI patterns
- **Backend**: Next.js API Routes, Mongoose
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **Validation**: Zod schemas

## Project Structure

```
restaurant-platform/
├── app/
│   ├── (auth)/              # Authentication routes group
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── (user)/              # User-facing routes group
│   │   ├── home/
│   │   ├── menu/
│   │   ├── item/[id]/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── orders/
│   │   └── profile/
│   ├── (admin)/             # Admin routes group
│   │   ├── dashboard/
│   │   ├── menu-management/
│   │   ├── orders/
│   │   ├── analytics/
│   │   └── settings/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── menu/           # Menu management
│   │   ├── orders/         # Order operations
│   │   ├── cart/           # Cart operations
│   │   ├── reviews/        # Reviews system
│   │   ├── payments/       # Payment processing
│   │   └── admin/          # Admin operations
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── ui/                # ShadCN components
│   ├── navbar/            # Navigation components
│   ├── footer/            # Footer components
│   ├── cards/             # Card components
│   └── animations/        # Animation components
├── lib/                   # Utility libraries
│   ├── db.ts             # MongoDB connection
│   ├── auth.ts           # JWT utilities
│   ├── validators.ts     # Zod validation schemas
│   └── constants.ts      # Application constants
├── models/                # Mongoose schemas
│   ├── User.ts
│   ├── MenuItem.ts
│   ├── Category.ts
│   ├── Order.ts
│   ├── Review.ts
│   ├── Payment.ts
│   ├── Offer.ts
│   ├── Admin.ts
│   └── Notification.ts
├── hooks/                # Custom React hooks
│   ├── useAuth.ts
│   ├── useCart.ts
│   └── useOrder.ts
├── types/               # TypeScript types
│   └── index.ts
├── styles/              # Additional styles
│   └── globals.css
├── middleware.ts        # Next.js middleware for auth
├── .env.example        # Environment variables template
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.mjs      # Next.js configuration
```

## Local Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/restaurant-platform

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Stripe (optional - for payments)
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Razorpay (optional - alternative payment gateway)
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Email (for password reset, notifications - optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@restaurant-platform.com

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@restaurant.com
ADMIN_PASSWORD=admin123

# App Settings
DELIVERY_FEE=5.00
TAX_RATE=0.08
MIN_ORDER_VALUE=10.00
```

### 3. MongoDB Setup

Make sure you have MongoDB running locally:

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install MongoDB locally
# Download from https://www.mongodb.com/try/download/community
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create user account
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user profile

### Menu
- `GET /api/menu` - Get all menu items (with filters, pagination)
- `GET /api/menu/[id]` - Get single item details
- `POST /api/menu` - Create item (admin only)
- `PUT /api/menu/[id]` - Update item (admin only)
- `DELETE /api/menu/[id]` - Delete item (admin only)

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/[id]` - Get order details
- `POST /api/orders` - Create new order
- `PUT /api/orders/[id]` - Update order status

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart

### Reviews
- `GET /api/reviews` - Get reviews (with filters)
- `POST /api/reviews` - Create review
- `PUT /api/reviews/[id]` - Update review
- `DELETE /api/reviews/[id]` - Delete review

### Payments
- `POST /api/payments` - Process payment
- `GET /api/payments/[id]` - Get payment details

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/users` - All users
- `PATCH /api/admin/users/[id]` - Block/unblock user
- `GET /api/admin/offers` - All offers
- `POST /api/admin/offers` - Create offer
- `PUT /api/admin/offers/[id]` - Update offer
- `DELETE /api/admin/offers/[id]` - Delete offer

## Database Schemas

### User
- Email, password (hashed)
- Profile information (name, phone, avatar)
- Addresses with coordinates
- Wallet with balance and transactions
- Role (user/admin)
- Block status

### MenuItem
- Name, description, price
- Category reference
- Images (main + 3D)
- Ingredients and nutrition info
- Tags (veg, non-veg, etc.)
- Stock, rating, availability status

### Order
- User reference
- Items with quantities
- Delivery address
- Pricing breakdown (subtotal, tax, fee, discount, total)
- Payment method and status
- Order status workflow
- Applied coupon reference

### Review
- User, menu item, order references
- Rating (1-5), title, comment
- Images
- Approval status
- Helpful votes

### Offer
- Title, description, unique code
- Discount type (percentage/fixed)
- Validation rules (max discount, min order, usage limits)
- Date range
- Category restrictions

### Payment
- Order and user references
- Amount, currency, method
- Transaction ID, status
- Receipt URL

### Admin
- User reference
- Role (super_admin, admin, moderator)
- Permissions array
- Last login timestamp

### Notification
- User reference
- Type (order_placed, order_confirmed, etc.)
- Title, message
- Order reference (optional)
- Read status

## Default Admin Credentials

Email: `admin@restaurant.com`
Password: `admin123`

**Important**: Change these credentials after initial setup!

## Authentication & Authorization

The application uses JWT-based authentication with the following features:

- HttpOnly cookies for token storage (more secure than localStorage)
- Role-based access control (User, Admin)
- Protected routes via middleware
- Token expiration (default: 7 days)
- Automatic redirect on auth failure

### Protected Routes

**User Routes**: `/home`, `/menu`, `/cart`, `/checkout`, `/orders`, `/profile`

**Admin Routes**: `/admin/dashboard`, `/admin/menu-management`, `/admin/orders`, `/admin/analytics`, `/admin/settings`

## Middleware

The Next.js middleware (`middleware.ts`) handles:

- Route protection based on authentication status
- Role-based redirection (users vs admins)
- Token validation and expiration handling
- Public route access control (login, signup)

## Payment Methods

- **Credit/Debit Card**: Via Stripe integration
- **UPI**: Direct payment processing
- **Wallet**: Internal wallet system
- **Cash on Delivery**: Traditional COD option

## Future Enhancements

- Real-time order tracking via WebSockets
- Push notifications for order updates
- Advanced analytics and reporting
- Multi-restaurant support
- Delivery partner integration
- Mobile app (React Native)
- AI-powered recommendations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub or contact support@restaurant-platform.com
