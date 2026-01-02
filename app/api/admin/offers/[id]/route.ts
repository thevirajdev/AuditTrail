import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@lib/db';
import Offer from '@models/Offer';
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
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    const body = await request.json();

    const offer = await Offer.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    ).populate('applicableCategories', 'name slug');

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Offer updated successfully', offer },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update offer error:', error);
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
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await connectDB();

    const offer = await Offer.findByIdAndDelete(params.id);

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Offer deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete offer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
