import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import House from '@/lib/models/HouseModel'
import connectDB from '@/lib/db'

// Connect to the database
connectDB()

// PUT request - Updates the entire house or specific fields (e.g., taken, availableAfter)
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

// PATCH request - Partial update for any fields
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()

    // Check if the body is empty
    if (Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    // Check if house exists
    const house = await House.findById(params.id)
    if (!house) {
      return NextResponse.json({ error: 'House not found' }, { status: 404 })
    }

    // Perform update using $set to only modify fields sent in the request
    const updatedHouse = await House.findByIdAndUpdate(
      params.id,
      { $set: body }, // Set only the fields provided
      { new: true }   // Return the updated document
    )

    return NextResponse.json(updatedHouse, { status: 200 })
  } catch (error) {
    console.error('Error patching house:', error)
    return NextResponse.json({ error: 'Failed to patch house' }, { status: 500 })
  }
}
