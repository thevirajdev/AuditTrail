import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@lib/db';
import Order from '@models/Order';
import User from '@models/User';
import MenuItem from '@models/MenuItem';
import { getAuthToken, verifyToken } from '@lib/auth';

export async function GET(request: NextRequest) {
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalRevenue, totalOrders, totalUsers, totalMenuItems, pendingOrders, todayOrders, todayOrdersDocs] = await Promise.all([
      Order.aggregate([
        { $match: { orderStatus: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      Order.countDocuments(),
      User.countDocuments({ role: 'user' }),
      MenuItem.countDocuments(),
      Order.countDocuments({ orderStatus: 'pending' }),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.find({ createdAt: { $gte: today } }),
    ]);

    const todayRevenue = todayOrdersDocs.reduce((sum: number, order: any) => {
      return sum + (order.orderStatus !== 'cancelled' ? order.totalAmount : 0);
    }, 0);

    const popularItems = await Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.menuItemId', count: { $sum: '$items.quantity' } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'menuitems', localField: '_id', foreignField: '_id', as: 'menuItem' } },
      { $unwind: '$menuItem' },
      { $project: { name: '$menuItem.name', count: 1 } },
    ]);

    const recentOrders = await Order.find()
      .populate('userId', 'firstName lastName email')
      .populate('items.menuItemId', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    const stats = {
      totalRevenue: totalRevenue[0]?.total || 0,
      totalOrders,
      totalUsers,
      totalMenuItems,
      pendingOrders,
      todayOrders,
      todayRevenue,
      popularItems,
      recentOrders,
    };

    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
