import { Phone, Mail, Wifi, Utensils, Home, Users, Bed, Droplet, BriefcaseBusiness, Sparkles } from 'lucide-react'
import Image from 'next/image';

export default function FeaturesSection() {
  return (
    <section className="bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Contact and Customer Support Section */}
    <div className="lg:w-1/3">
      <h2 className="text-3xl font-bold text-primary mb-6">Contact & Support</h2>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="btn btn-circle btn-success btn-sm mr-4">
                <Phone className="h-4 w-4" />
              </div>
              <span className="text-base-content">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <div className="btn btn-circle btn-success btn-sm mr-4">
                <Mail className="h-4 w-4" />
              </div>
              <span className="text-base-content">support@debyhotel.com</span>
            </div>
          </div>
        </div>
        <figure className="px-4 pb-4">
          <Image
            src="/rec.jpg"
            alt="Hotel support team"
            width={400}
            height={200}
            className="rounded-xl"
          />
        </figure>
      </div>
    </div>


          {/* Features Section */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold text-success mb-6">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard icon={<Home />} title="Decorated Houses" />
              <FeatureCard icon={<Utensils />} title="Wide Range of Food" />
              <FeatureCard icon={<Wifi />} title="Free Internet" />
              <FeatureCard icon={<Droplet />} title="Swimming Pools" />
              <FeatureCard icon={<BriefcaseBusiness />} title="Classy Meeting Rooms" />
              <FeatureCard icon={<Bed />} title="King Size Beds" />
              <FeatureCard icon={<Sparkles />} title="Clean Room Services" />
              <FeatureCard icon={<Users />} title="Double Houses for Full Family" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body flex-row items-center">
        <div className="mr-4 text-success">
          {icon}
        </div>
        <h3 className="card-title text-base-content">{title}</h3>
      </div>
    </div>
  )
}