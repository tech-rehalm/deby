import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userDetails: {
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  room: {
    type: mongoose.Types.ObjectId,
    ref: "House",
    required: true,
  },
  title: { type: String, required: true },
  image: { type: String, required: true },
  checkIn: {
    type: Date, // Changed from String to Date
    required: true,
  },
  checkOut: {
    type: Date, // Changed from String to Date
    required: true,
  },
  numOfPeople: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
  },
  paidAt: { 
    type: Date,
  },
  totalPrice: { 
    type: Number, // Added total price for the booking
  },
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "cancelled"], // Added booking status
    default: "pending",
  },
  specialRequests: { 
    type: String, // Optional field for any special requests
  },
}, {
  timestamps: true, // Added timestamps
});

const BookingModel = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default BookingModel;

export type Booking = {
  _id: string;
  user?: { name: string };
  userDetails: {
    fullName: string;
    age: number;
    address: string;
    phone: number;
  };
  room: { title: string };
  image: string
  title:string
  checkIn: Date; // Changed to Date
  checkOut: Date; // Changed to Date
  numOfPeople: number;
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
  };
  paidAt?: Date;
  totalPrice?: number; // Added total price
  status?: "pending" | "confirmed" | "cancelled"; // Added booking status
  specialRequests?: string; // Optional special requests
  createdAt?: Date; // Automatically added by Mongoose
  updatedAt?: Date; // Automatically added by Mongoose
};
