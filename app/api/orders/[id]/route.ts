import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@lib/db';
import Order from '@models/Order';
import { getAuthToken, verifyToken } from '@lib/auth';
import { ORDER_STATUSES } from '@lib/constants';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const query: any = { _id: params.id };

    if (payload.role !== 'admin') {
      query.userId = payload.userId;
    }

    const order = await Order.findOne(query)
      .populate('userId', 'firstName lastName email phone')
      .populate('items.menuItemId', 'name image description')
      .populate('appliedCoupon', 'code discountType discountValue');

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    if (payload.role === 'admin') {
      if (body.orderStatus && !ORDER_STATUSES.includes(body.orderStatus)) {
        return NextResponse.json({ error: 'Invalid order status' }, { status: 400 });
      }

      const order = await Order.findByIdAndUpdate(
        params.id,
        { $set: body },
        { new: true }
      )
        .populate('userId', 'firstName lastName email')
        .populate('items.menuItemId', 'name image')
        .populate('appliedCoupon', 'code discountType discountValue');

      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      return NextResponse.json(
        { message: 'Order updated successfully', order },
        { status: 200 }
      );
    } else {
      if (body.orderStatus && body.orderStatus !== 'cancelled') {
        return NextResponse.json(
          { error: 'Can only cancel orders' },
          { status: 403 }
        );
      }

      const order = await Order.findOneAndUpdate(
        { _id: params.id, userId: payload.userId },
        { $set: { orderStatus: 'cancelled' } },
        { new: true }
      )
        .populate('userId', 'firstName lastName email')
        .populate('items.menuItemId', 'name image')
        .populate('appliedCoupon', 'code discountType discountValue');

      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      return NextResponse.json(
        { message: 'Order cancelled successfully', order },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
