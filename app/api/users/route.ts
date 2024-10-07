import connectDB from "@/lib/db";
import User from "@/lib/models/UserModel";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs"; // Import the hash function from bcryptjs

export async function POST(req: any) {
    const { name, email, password } = await req.json();

    // Validate input fields
    if (!name || !email || !password) {
        return NextResponse.json({ message: "Please fill in all fields" }, { status: 400 });
    }

    try {
        // Connect to the database
        await connectDB();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 }); // 409 Conflict
        }

        // Hash the password before saving
        const hashedPassword = await hash(password, 10); // 10 is the salt rounds

        // Create a new user with the hashed password
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 201 }); // 201 Created
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error creating user" }, { status: 500 }); // 500 Internal Server Error
    }
}

export async function GET() {
    try {
        const users = await User.find({});
        return NextResponse.json(users, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 }); // 500 Internal Server Error
    }
}
