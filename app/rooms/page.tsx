"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Loading from '../loading';

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
        setRooms(data.houses || []);
      } catch (err) {
        setError('Failed to load rooms. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const bedrooms = rooms.filter((room) => room.field === 'Rooms');
  const conferencerooms = rooms.filter((room) => room.field === 'Conference');
  const venues = rooms.filter((room) => room.field === 'Venue');
  const gazebo = rooms.filter((room) => room.field === 'Gazebo');

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div style={{ backgroundImage: "url('/sitting.jpg')" }} className="hero h-[80vh] mt-[70px] backdrop-blur-sm w-full flex items-center justify-center" >
      <div className="bg-[#000000c0] h-full w-full">
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl lg:text-7xl font-bold">Find Your Perfect Stay</h1>
            <p className="mb-5">Experience luxury and comfort in our meticulously designed rooms and venues. Whether you're here for a relaxing stay, a business meeting, or a special event, we have the perfect space for you.</p>
            <a href="#rooms" className="btn btn-success">Explore Rooms</a>
          </div>
        </div>
      </div>
        
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {error && <div className="alert alert-error shadow-lg mb-8">{error}</div>}

        {/* Bedrooms Section */}
        <section id="rooms" className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Bedrooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bedrooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        </section>

        {/* Conference Rooms Section */}
        <section id="conference" className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Conference Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conferencerooms.map((room) => (
              <RoomCard key={room._id} room={room} isLarge={room.title === "Conference Room 1" || room.title === "Conference Room 4"} />
            ))}
          </div>
        </section>

        {/* Wedding Venues Section */}
        <section id="venue" className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Wedding Venues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((room) => (
              <RoomCard key={room._id} room={room} isLarge={room.title === "Wedding Venue 2" || room.title === "Wedding Venue 3"} />
            ))}
          </div>
        </section>

        {/* Honeymoon Gazebo Section */}
        <section id="gazebo" className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Honeymoon Gazebo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gazebo.map((room) => (
              <RoomCard key={room._id} room={room} isLarge={room.title === "Gazebo 1"} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function RoomCard({ room, isLarge = false }: { room: Room; isLarge?: boolean }) {
  return (
    <Link href={`rooms/${room._id}`} className={`card bg-base-100 shadow-xl ${isLarge ? 'md:col-span-2' : ''}`}>
      <figure>
        <Image src={`${room.image}`} alt={room.title} width={500} height={300} className="w-full h-64 object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">
          {room.title}
          {room.taken ? (
            <div className="badge badge-error">Booked</div>
          ) : (
            <div className="badge badge-success">Available</div>
          )}
        </h3>
        <p className="text-sm opacity-70">{room.category}</p>
        <p className={`${isLarge ? 'line-clamp-3' : 'line-clamp-2'}`}>{room.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-success">View Details</button>
        </div>
      </div>
    </Link>
  );
}