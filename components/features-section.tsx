"use client"

import { motion } from "framer-motion"
import { Clock, Globe, BarChart, Truck, Shield, Route } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-orange-500" />,
      title: "Global Shipping",
      description:
        "We provide international shipping services to over 200 countries worldwide, with competitive rates and reliable delivery times.",
    },
    {
      icon: <Route className="h-8 w-8 text-orange-500" />,
      title: "Route Optimization",
      description:
        "Our AI-powered system calculates the most efficient routes to ensure your shipments arrive on time while minimizing costs.",
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      title: "Real-time Tracking",
      description:
        "Track your shipments in real-time with our advanced GPS tracking system. Know exactly where your package is at all times.",
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-500" />,
      title: "Secure Handling",
      description:
        "Your packages are handled with the utmost care and security, with insurance coverage available for valuable shipments.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-orange-500" />,
      title: "Analytics Dashboard",
      description:
        "Access comprehensive shipping analytics to optimize your logistics operations and reduce costs over time.",
    },
    {
      icon: <Globe className="h-8 w-8 text-orange-500" />,
      title: "24/7 Support",
      description:
        "Our dedicated customer support team is available around the clock to assist with any questions or concerns.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 sm:py-24 bg-black" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Services</h2>
          <p className="mt-4 text-xl text-gray-400">Comprehensive logistics solutions for your business</p>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 transition-all duration-300 hover:border-orange-500"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
              <Link
                href="#"
                className="inline-flex items-center mt-4 text-orange-500 hover:text-orange-400 text-sm font-medium"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  )
}

