// api/order/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // Your existing Mongoose connection
import BookingModel from '@/lib/models/BookingModel'; // Ensure this model exists

// GET request handler to fetch an order by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Validate MongoDB ObjectId
  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: 'Invalid order ID' }, { status: 400 });
  }

  try {
    await connectDB(); // Connect to the database
    const order = await BookingModel.findById(id); // Fetch the order

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 }); // Return the found order
  } catch (error:any) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ message: 'Failed to fetch order', error: error.message }, { status: 500 });
  }
}

// PUT request handler to update order status
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Validate MongoDB ObjectId
  if (!isValidObjectId(id)) {
    return NextResponse.json({ message: 'Invalid order ID' }, { status: 400 });
  }

  try {
    const { status } = await req.json(); // Get the status from the request body

    // Validate status
    const validStatuses = ['pending', 'paid', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    await connectDB(); // Connect to the database

    const updatedOrder = await BookingModel.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Returns the updated document
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 }); // Return the updated order
  } catch (error:any) {
    console.error('Error updating order:', error);
    return NextResponse.json({ message: 'Failed to update order', error: error.message }, { status: 500 });
  }
}

// Helper function to check if an ObjectId is valid
function isValidObjectId(id: string): boolean {
  return /^[a-fA-F0-9]{24}$/.test(id); // MongoDB ObjectId is 24 hex characters
}
