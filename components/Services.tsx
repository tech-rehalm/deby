import React from 'react'
import Link from 'next/link'
import { Star, Bed, Users, Heart, Gift, ChevronRight, MapPin, Phone, Mail } from 'lucide-react'

export default function Services() {
  return (
    <div className="min-h-screen gray-800">

      {/* Services Overview */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Accommodation', icon: <Bed className="w-12 h-12 mb-4 text-success" />, description: 'Luxurious rooms and suites' },
            { title: 'Leisure Center', icon: <Users className="w-12 h-12 mb-4 text-success" />, description: 'State-of-the-art fitness facilities' },
            { title: 'Restaurants', icon: <Gift className="w-12 h-12 mb-4 text-success" />, description: 'World-class dining experiences' },
            { title: 'Conferencing', icon: <Users className="w-12 h-12 mb-4 text-success" />, description: 'Modern meeting and event spaces' },
          ].map((service, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                {service.icon}
                <h3 className="card-title">{service.title}</h3>
                <p>{service.description}</p>
                <div className="card-actions">
                  <Link href={`/${service.title.toLowerCase()}`} className="btn btn-success btn-sm">
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Offerings */}
      <div className="bg-base-300 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Bedrooms', image: '/room1.jpg', description: 'Day and night accommodation', price: 'From $99/night' },
              { title: 'Boardrooms', image: '/conf2.webp', description: 'Professional meeting spaces', price: 'From $199/day' },
              { title: 'Honeymoon Suites', image: '/gaze4.webp', description: 'Romantic getaways', price: 'From $299/night' },
              { title: 'Wedding Venues', image: '/venue5.jpg', description: 'Unforgettable celebrations', price: 'Custom packages' },
            ].map((offering, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <figure><img src={offering.image} alt={offering.title} className="h-48 w-full object-cover" /></figure>
                <div className="card-body">
                  <h3 className="card-title">{offering.title}</h3>
                  <p>{offering.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-primary font-bold">{offering.price}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-warning fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Link href="/rooms" className="btn btn-primary btn-sm">
                      Check Availability
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-success">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Anania Verma', comment: 'Exceptional service and stunning views. Will definitely return!', rating: 5 },
              { name: 'Jane Smith', comment: 'The perfect venue for our company retreat. Highly recommended!', rating: 5 },
              { name: 'Alex Johnson', comment: 'Luxurious rooms and world-class dining. A truly unforgettable experience.', rating: 5 },
            ].map((testimonial, index) => (
              <div key={index} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="mb-4">&ldquo;{testimonial.comment}&rdquo;</p>
                  <p className="font-bold">- {testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-base-300 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-success">Contact Us</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-2 text-primary" />
              <span>123 Hotel Lama Street, Delhi, India</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-2 text-primary" />
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-2 text-primary" />
              <span>info@debyhotel.com</span>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/contact" className="btn btn-success">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}