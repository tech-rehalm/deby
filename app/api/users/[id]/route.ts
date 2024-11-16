import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/UserModel';

const validRoles = ['admin', 'user', 'staff']; // List of valid roles

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  await connectDB();

  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  await connectDB();

  try {
    const body = await req.json();
    const { name, email, role } = body;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update user fields if they are provided
    if (name) user.name = name;
    if (email) user.email = email;

    // Check if role is provided and is a valid role
    if (role && validRoles.includes(role)) {
      user.role = role;
    }

    // Save the updated user
    await user.save();

    // Return the updated user without the password field
    const updatedUser = await User.findById(id).select('-password');
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  await connectDB();

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
  }
}
