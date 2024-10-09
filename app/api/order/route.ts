import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import BookingModel from '@/lib/models/BookingModel'
import connectDB from '@/lib/db'

// Connect to the database
connectDB()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Destructure the order data from the request body
    const {
      user,
      userDetails,
      title,
      image,
      room,
      checkIn,
      checkOut,
      numOfPeople,
      paymentMethod,
      totalPrice,
      specialRequests,
    } = body

    // Validate required fields
    if (!user || !userDetails || !room || !title || !image || !checkIn || !checkOut || !numOfPeople || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create a new booking in the database
    const newBooking = new BookingModel({
      user,
      userDetails,
      room,
      title,
      image,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      numOfPeople,
      paymentMethod,
      totalPrice,
      specialRequests,
    })

    // Save the booking to the database
    const savedBooking = await newBooking.save()

    return NextResponse.json(savedBooking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    // Ensure database connection
    await connectDB()

    // Fetch all bookings from the database
    const bookings = await BookingModel.find({})
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .populate('user', 'name email') // Populate user details
      .populate('room', 'title') // Populate room details

    // Return the bookings
    return NextResponse.json(bookings, { status: 200 })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}