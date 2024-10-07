"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Room {
  _id: string;
  title: string;
  taken: boolean;
  field: string;
  category: string;
  description: string;
  image: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/apartments');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        // console.log(data); // Log to inspect the structure

        // Adjusted to access the `houses` array from the response
        setRooms(data.houses || []);
      } catch (err) {
        setError('Failed to load rooms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  // Filter for rooms with the field 'Bedroom'
  const bedrooms = rooms.filter((room) => room.field === 'Rooms');
  const conferencerooms = rooms.filter((room) => room.field === 'Conference');
  const venues = rooms.filter((room) => room.field === 'Venue');
  const gazebo = rooms.filter((room) => room.field === 'Gazebo');
  

  return (
    <div className='w-full min-h-screen pt-[60px] p-3 flex flex-col items-center lg:p-[60px]'>
      <h1 className="text-4xl font-extrabold opacity-80 text-gray-200 mt-5 lg:text-7xl lg:my-6">Find your stay</h1>
      <p className="font-bold text-success mb-4 lg:mb-8">Find the room of your choice and enjoy luxurios confort</p>
      <p className="font-extralight p-3 md:w-[80%] lg:w-[70%] text-center">
        Experience luxury and comfort in our meticulously designed rooms and venues. Whether you're here for a relaxing stay, a business meeting, or a special event, we have the perfect space for you.
      </p>
      <h1 className="text-4xl w-full text-center font-extrabold opacity-80 text-gray-200 mt-5 lg:text-7xl lg:my-6">Bedrooms</h1>
      <p className="font-bold text-success mb-4 lg:mb-8">Find the room of your choice and enjoy luxurios confort</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {loading && <p>Loading rooms...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {bedrooms.map((room) => (
          <Link href={`rooms/${room._id}`} key={room._id} className='bg-slate-700 border border-gray-600 p-2 rounded-lg '>
            <div className="border border-gray-800 bg-slate-800 p-2 flex flex-col rounded-lg h-full">
                <Image src={room.image} alt={room.title} height={200} width={250} className='w-full object-cover h-[150px]' />
                <h1 className="font-bold">{room.title}</h1>
                <div className="w-full flex text-sm justify-between items-center my-1">
                    <p className="font-extralight ">{room.category}</p>
                    {room.taken? (
                    <p className="font-bold text-red-600 ">Booked</p>
                    ): (
                    <p className="font-bold text-success mb-4 lg:mb-8 ">Available</p>
                    )}
                </div>
                
                <p className="text-sm font-extralight line-clamp-1">{room.description}...</p>
                <div className="btn btn-success my-2">View Room</div>
            </div>
          </Link>
        ))}
      </div>
      <h1 className="text-4xl w-full text-center font-extrabold opacity-80 text-gray-200 mt-5 lg:text-7xl lg:mt-8 mb-2 my-5">Conference Rooms</h1>
      <p className="font-bold text-success mb-4 lg:mb-8">Find the room of your choice and conduct professional meetings</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:w-[80%] lg:w-[65%] gap-4">
        {conferencerooms?.map((room, index)=>(
            <Link href={`rooms/${room._id}`} key={room._id} className={`bg-gradient-to-tl from-slate-700 border border-gray-600 p-2 rounded-lg ${room.title === "Conference Room 1" &&"md:col-span-2 grid grid-cols-1 md:grid-cols-2" || room.title === "Conference Room 4" &&"md:col-span-2 grid grid-cols-1 md:grid-cols-2"}`}>
                <Image src={room.image} alt={room.title} height={200} width={250} className={` w-full object-cover rounded-lg h-[150px] ${room.title === "Conference Room 1" &&"h-full " || room.title === "Conference Room 4" &&"h-full "}` }  />
                <div className="p-2 flex flex-col justify-between">
                  <h1 className="font-bold">{room.title}</h1>
                  <div className=" w-full flex text-sm justify-between items-center my-1">
                    <p className="font-extralight ">{room.category}</p>
                    {room.taken? (
                    <p className="font-bold text-red-600 ">Booked</p>
                    ): (
                    <p className="font-bold text-success mb-4 lg:mb-8 ">Available</p>
                    )}
                </div>
                
                <p className={`text-sm font-extralight line-clamp-1 ${room.title === "Conference Room 1" &&"md:line-clamp-5 mt-5 " || room.title === "Conference Room 4" &&"md:line-clamp-5 mt-5  "}`}>{room.description}...</p>
                <div className="btn btn-success my-2">View Suite</div>
                </div>
                
            </Link>
        ))}
      </div>
      <h1 className="text-4xl w-full text-center font-extrabold opacity-80 text-gray-200 mt-5 lg:text-7xl lg:mt-8 mb-2 my-5">Wedding Venues</h1>
      <p className="font-bold text-success mb-4 lg:mb-8">Find the best venue that matches your theme</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:w-[80%] lg:w-[65%] gap-4">
        {venues?.map((room, index)=>(
            <Link href={`rooms/${room._id}`} key={room._id} className={`bg-gradient-to-tl from-slate-700 border border-gray-600 p-2 rounded-lg ${room.title === "Wedding Venue 2" &&"md:col-span-2 grid grid-cols-1 md:grid-cols-2" || room.title === "Wedding Venue 3" &&"md:col-span-2 grid grid-cols-1 md:grid-cols-2"}`}>
                <Image src={room.image} alt={room.title} height={200} width={250} className={` w-full object-cover rounded-lg h-[150px] ${room.title === "Wedding Venue 2" &&"h-full " || room.title === "Wedding Venue 3" &&"h-full "}` }  />
                <div className="p-2 flex flex-col justify-between">
                  <h1 className="font-bold">{room.title}</h1>
                  <div className=" w-full flex text-sm justify-between items-center my-1">
                    <p className="font-extralight ">{room.category}</p>
                    {room.taken? (
                    <p className="font-bold text-red-600 ">Booked</p>
                    ): (
                    <p className="font-bold text-success ">Available</p>
                    )}
                </div>
                
                <p className={`text-sm font-extralight line-clamp-1 ${room.title === "Wedding Venue 2" &&"md:line-clamp-5 mt-5 " || room.title === "Wedding Venue 3" &&"md:line-clamp-5 mt-5  "}`}>{room.description}...</p>
                <div className="btn btn-success my-2">View Suite</div>
                </div>
                
            </Link>
        ))}
      </div>
      <h1 className="text-4xl w-full text-center font-extrabold opacity-80 text-gray-200 mt-5 lg:text-7xl lg:mt-8 mb-2 my-5">Honeymoon Gazebo</h1>
      <p className="font-bold text-success mb-4 lg:mb-8">Choose a gazebo and enjoy your lunch or dinner with your partner.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:w-[80%] lg:w-[65%] gap-4">
        {gazebo?.map((room, index)=>(
            <Link href={`rooms/${room._id}`} key={room._id} className={`bg-gradient-to-tl from-slate-700 border border-gray-600 p-2 rounded-lg ${room.title === "Gazebo 1" &&"md:col-span-2 grid grid-cols-1 md:grid-cols-2"}`}>
                <Image src={room.image} alt={room.title} height={200} width={250} className={` w-full object-cover rounded-lg h-[150px] ${room.title === "Gazebo 1" &&"h-full "}` }  />
                <div className="p-2 flex flex-col justify-between">
                  <h1 className="font-bold">{room.title}</h1>
                  <div className=" w-full flex text-sm justify-between items-center my-1">
                    <p className="font-extralight ">{room.category}</p>
                    {room.taken? (
                    <p className="font-bold text-red-600 ">Booked</p>
                    ): (
                    <p className="font-bold text-success mb-4 lg:mb-8 ">Available</p>
                    )}
                </div>
                
                <p className={`text-sm font-extralight line-clamp-1 ${room.title === "Gazebo 1" &&"md:line-clamp-5 mt-5 "}`}>{room.description}...</p>
                <div className="btn btn-success my-2">View Suite</div>
                </div>
                
            </Link>
        ))}
      </div>
    </div>
  );
}
