import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@lib/db';
import Review from '@models/Review';
import { getAuthToken, verifyToken } from '@lib/auth';

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

    const review = await Review.findOne({
      _id: params.id,
      userId: payload.userId,
    });

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const body = await request.json();

    const updatedReview = await Review.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    )
      .populate('userId', 'firstName lastName avatar')
      .populate('menuItemId', 'name');

    return NextResponse.json(
      { message: 'Review updated successfully', review: updatedReview },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    let review;
    if (payload.role === 'admin') {
      review = await Review.findByIdAndDelete(params.id);
    } else {
      review = await Review.findOneAndDelete({
        _id: params.id,
        userId: payload.userId,
      });
    }

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Review deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
