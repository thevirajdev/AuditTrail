import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@lib/db';
import Order from '@models/Order';
import MenuItem from '@models/MenuItem';
import { getAuthToken, verifyToken } from '@lib/auth';
import { orderSchema } from '@lib/validators';
import { DEFAULT_DELIVERY_FEE, DEFAULT_TAX_RATE } from '@lib/constants';

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken();
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    const query: any = { userId: payload.userId };

    if (status) {
      query.orderStatus = status;
    }

    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('userId', 'firstName lastName email')
        .populate('items.menuItemId', 'name image')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(query),
    ]);

    return NextResponse.json(
      {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getAuthToken();
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const validationResult = orderSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { items, deliveryAddress, paymentMethod, notes, appliedCoupon } = validationResult.data;

    const menuItems = await MenuItem.find({
      _id: { $in: items.map((item: any) => item.menuItemId) },
    });

    if (menuItems.length !== items.length) {
      return NextResponse.json(
        { error: 'Some menu items not found' },
        { status: 404 }
      );
    }

    const itemsWithPrices = items.map((item: any) => {
      const menuItem = menuItems.find((m: any) => m._id.toString() === item.menuItemId);
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: menuItem?.price || 0,
        specialInstructions: item.specialInstructions,
      };
    });

    const subtotal = itemsWithPrices.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const tax = subtotal * DEFAULT_TAX_RATE;
    const deliveryFee = DEFAULT_DELIVERY_FEE;
    const discount = 0;
    const totalAmount = subtotal + tax + deliveryFee - discount;

    const estimatedDeliveryTime = 30 + Math.floor(Math.random() * 30);

    const order = await Order.create({
      userId: payload.userId,
      items: itemsWithPrices,
      deliveryAddress,
      subtotal,
      tax,
      deliveryFee,
      discount,
      totalAmount,
      paymentMethod,
      estimatedDeliveryTime,
      notes,
      appliedCoupon,
    });

    await order.populate('items.menuItemId', 'name image');

    return NextResponse.json(
      { message: 'Order created successfully', order },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
