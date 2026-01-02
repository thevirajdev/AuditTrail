import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@lib/db';
import MenuItem from '@models/MenuItem';
import Category from '@models/Category';
import { getAuthToken, verifyToken } from '@lib/auth';
import { menuItemSchema } from '@lib/validators';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const isAvailable = searchParams.get('available');
    const isFeatured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || '-createdAt';

    const query: any = {};

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      }
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (isAvailable !== null) {
      query.isAvailable = isAvailable === 'true';
    }

    if (isFeatured !== null) {
      query.isFeatured = isFeatured === 'true';
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      MenuItem.find(query)
        .populate('category', 'name slug icon')
        .sort(sortBy)
        .skip(skip)
        .limit(limit),
      MenuItem.countDocuments(query),
    ]);

    return NextResponse.json(
      {
        items,
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
    console.error('Get menu items error:', error);
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
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    const body = await request.json();
    const validationResult = menuItemSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const item = await MenuItem.create(validationResult.data);
    await item.populate('category', 'name slug icon');

    return NextResponse.json(
      { message: 'Menu item created successfully', item },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create menu item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
