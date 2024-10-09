import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import House from '@/lib/models/HouseModel'
import connectDB from '@/lib/db'

// Connect to the database
connectDB()

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()

    const { taken, availableAfter } = body

    // Validate required fields
    if (taken === undefined || !availableAfter) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Update the house in the database
    const updatedHouse = await House.findByIdAndUpdate(
      params.id,
      { taken, availableAfter: new Date(availableAfter) },
      { new: true } // Returns the updated document
    )

    if (!updatedHouse) {
      return NextResponse.json({ error: 'House not found' }, { status: 404 })
    }

    return NextResponse.json(updatedHouse, { status: 200 })
  } catch (error) {
    console.error('Error updating house:', error)
    return NextResponse.json({ error: 'Failed to update house status' }, { status: 500 })
  }
}
