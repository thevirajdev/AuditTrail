import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@lib/db';
import Payment from '@models/Payment';
import { getAuthToken, verifyToken } from '@lib/auth';

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
    const { orderId, amount, method, transactionId } = body;

    if (!orderId || !amount || !method || !transactionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const payment = await Payment.create({
      orderId,
      userId: payload.userId,
      amount,
      method,
      transactionId,
      status: 'completed',
    });

    return NextResponse.json(
      { message: 'Payment verified successfully', payment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
