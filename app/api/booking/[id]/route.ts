// pages/api/booking/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // Make sure this is the path to your database connection
import Booking from '@/lib/models/BookingModel'; // Adjust the path to your Booking model

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Connect to the database
  await connectDB();

  try {
    const bookings = await Booking.find({ user: id }); // Assuming you have userId in your Booking model
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ message: 'Failed to fetch bookings' }, { status: 500 });
  }
}
