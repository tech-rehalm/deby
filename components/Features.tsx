"use client"

import { Phone, Mail, Wifi, Utensils, Home, Users, Bed, Droplet, BriefcaseBusiness, Sparkles } from 'lucide-react'
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function FeaturesSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="bg-gray-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Contact and Customer Support Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
            className="lg:w-1/3"
          >
            <h2 className="text-3xl font-bold text-primary mb-6">Contact & Support</h2>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
              className="card bg-gray-900 shadow-xl"
            >
              <div className="card-body">
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center"
                  >
                    <div className="btn btn-circle btn-success btn-sm mr-4">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span className="text-base-content">+1 (555) 123-4567</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center"
                  >
                    <div className="btn btn-circle btn-success btn-sm mr-4">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="text-base-content">support@debyhotel.com</span>
                  </motion.div>
                </div>
              </div>
              <figure className="px-4 pb-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src="/rec.jpg"
                    alt="Hotel support team"
                    width={400}
                    height={200}
                    className="rounded-xl"
                  />
                </motion.div>
              </figure>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
            className="lg:w-2/3"
          >
            <h2 className="text-3xl font-bold text-success mb-6">Our Features</h2>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <FeatureCard icon={<Home />} title="Decorated Houses" />
              <FeatureCard icon={<Utensils />} title="Wide Range of Food" />
              <FeatureCard icon={<Wifi />} title="Free Internet" />
              <FeatureCard icon={<Droplet />} title="Swimming Pools" />
              <FeatureCard icon={<BriefcaseBusiness />} title="Classy Meeting Rooms" />
              <FeatureCard icon={<Bed />} title="King Size Beds" />
              <FeatureCard icon={<Sparkles />} title="Clean Room Services" />
              <FeatureCard icon={<Users />} title="Double Houses for Full Family" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

function FeatureCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05 }}
      className="card bg-gray-900 shadow-xl"
    >
      <div className="card-body flex-row items-center">
        <div className="mr-4 text-success">
          {icon}
        </div>
        <h3 className="card-title text-base-content">{title}</h3>
      </div>
    </motion.div>
  )
}