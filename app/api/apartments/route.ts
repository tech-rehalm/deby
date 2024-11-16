import House from "@/lib/models/HouseModel"
import connectDB from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req:any) {
    const { image, title, description, field, category } = await req.json();
    
    if (!title || !image || !description || !field || !category) {
        return NextResponse.json({ error: "Please fill in all the fields" }, { status: 400 });
    }
    
    await connectDB();
    
    try {
        const houses = await House.find();
        const number = houses.length + 1;
        console.log(houses.length);
        
        const houseExist = await House.findOne({ number });
        console.log(number);
        
        if (houseExist) {
            return NextResponse.json({ error: "House with the same number exists" }, { status: 400 });
        }

        const house = new House({
            title,
            number,
            image,
            description,
            field,
            category
        });
        await house.save();

        return NextResponse.json({ message: "House suite added successfully" });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    await connectDB();
    try {
        const houses = await House.find();
        return NextResponse.json({ houses });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
