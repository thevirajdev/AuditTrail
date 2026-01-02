import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@lib/db';
import User from '@models/User';
import { comparePassword } from '@lib/auth';
import { generateToken, setAuthCookie } from '@lib/auth';
import { loginSchema } from '@lib/validators';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (user.isBlocked) {
      return NextResponse.json(
        { error: 'Account is blocked' },
        { status: 403 }
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    setAuthCookie(token);

    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(
      {
        message: 'Login successful',
        user: userWithoutPassword,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
