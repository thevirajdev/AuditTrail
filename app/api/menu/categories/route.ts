import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@lib/db';
import Category from '@models/Category';
import { getAuthToken, verifyToken } from '@lib/auth';
import { categorySchema } from '@lib/validators';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const categories = await Category.find().sort({ order: 1 });

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('Get categories error:', error);
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
    const validationResult = categorySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const category = await Category.create(validationResult.data);

    return NextResponse.json(
      { message: 'Category created successfully', category },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
