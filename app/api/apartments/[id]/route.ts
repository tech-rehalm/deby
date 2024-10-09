import connectDB from "@/lib/db";
import House from "@/lib/models/HouseModel";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {

    const { id } = params;
    try{
    await connectDB()
        const room = await House.findOne({_id: id})
        return NextResponse.json(room,{status: 200})
    } catch (error) {
        return NextResponse.json(error,{status: 404})
    }
}