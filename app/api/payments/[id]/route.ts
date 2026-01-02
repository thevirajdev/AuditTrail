import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@lib/db';
import Payment from '@models/Payment';
import { getAuthToken, verifyToken } from '@lib/auth';

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

    const query: any = { orderId: params.id };

    if (payload.role !== 'admin') {
      query.userId = payload.userId;
    }

    const payment = await Payment.findOne(query).populate('orderId');

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json({ payment }, { status: 200 });
  } catch (error) {
    console.error('Get payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
