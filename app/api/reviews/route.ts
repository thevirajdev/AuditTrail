import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@lib/db';
import Review from '@models/Review';
import MenuItem from '@models/MenuItem';
import { getAuthToken, verifyToken } from '@lib/auth';
import { reviewSchema } from '@lib/validators';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const menuItemId = searchParams.get('menuItemId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: any = { isApproved: true };

    if (menuItemId) {
      query.menuItemId = menuItemId;
    }

    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
      Review.find(query)
        .populate('userId', 'firstName lastName avatar')
        .populate('menuItemId', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Review.countDocuments(query),
    ]);

    return NextResponse.json(
      {
        reviews,
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
    console.error('Get reviews error:', error);
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
    const validationResult = reviewSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { menuItemId, rating, title, comment, images } = validationResult.data;

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }

    const existingReview = await Review.findOne({
      userId: payload.userId,
      menuItemId,
    });

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this item' },
        { status: 409 }
      );
    }

    const review = await Review.create({
      userId: payload.userId,
      menuItemId,
      orderId: body.orderId,
      rating,
      title,
      comment,
      images: images || [],
    });

    await review.populate('userId', 'firstName lastName avatar');

    return NextResponse.json(
      { message: 'Review created successfully', review },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
