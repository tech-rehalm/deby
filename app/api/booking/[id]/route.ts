// pages/api/booking/[id].ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // Adjust the path to your database connection
import Booking from '@/lib/models/BookingModel'; // Adjust the path to your Booking model

// Handle fetching booking by user ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Connect to the database
  await connectDB();

  try {
    const bookings = await Booking.find({ user: id }); // Fetch bookings by user ID
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ message: 'Failed to fetch bookings' }, { status: 500 });
  }
}

// Handle updating a booking by ID
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json(); // Get the request body containing the updated data

  // Connect to the database
  await connectDB();

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, body, { new: true });
    if (!updatedBooking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json({ message: 'Failed to update booking' }, { status: 500 });
  }
}

// Handle deleting a booking by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Connect to the database
  await connectDB();

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Booking deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ message: 'Failed to delete booking' }, { status: 500 });
  }
}
