"use client"

import { motion } from "framer-motion"
import { Brain, Map, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ValueProposition() {
  const benefits = [
    {
      icon: <Brain className="h-12 w-12 text-blue-600" />,
      title: "AI-Powered Freight Matching",
      description:
        "Our sophisticated algorithm connects you with the perfect carriers based on location, vehicle type, and delivery requirements. Reduce waiting time and find the ideal match instantly.",
      learnMore:
        "The matching algorithm considers over 20 factors including historical performance, route optimization, and real-time availability to ensure the most compatible carrier for your needs.",
    },
    {
      icon: <Map className="h-12 w-12 text-green-600" />,
      title: "End-to-End Visibility",
      description:
        "Track your shipments in real-time from pickup to delivery. Get instant notifications about status changes and accurate ETAs based on live traffic data.",
      learnMore:
        "Our tracking system utilizes GPS technology with geofencing capabilities to provide accurate location updates every 30 seconds, with customizable alert thresholds for any deviations from the planned route.",
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-purple-600" />,
      title: "Secure Escrow Payments",
      description:
        "Our escrow system holds payment until successful delivery confirmation, providing financial security for both parties and eliminating payment disputes.",
      learnMore:
        "Payments are secured through bank-grade encryption and are automatically released upon delivery confirmation, or after a 48-hour verification period if not manually confirmed, ensuring carriers receive payment promptly.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 sm:py-24 bg-white" id="benefits">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Choose MarocTransit?</h2>
          <p className="mt-4 text-xl text-gray-500">
            Our platform offers innovative solutions to transform your logistics operations
          </p>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={item}>
              <BenefitCard {...benefit} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function BenefitCard({ icon, title, description, learnMore }) {
  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg border border-gray-200">
      <CardHeader className="pb-2">
        <div className="p-3 w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <details className="w-full">
          <summary className="text-blue-600 cursor-pointer font-medium hover:text-blue-800 flex items-center text-sm">
            Learn more
          </summary>
          <p className="mt-2 text-sm text-gray-500">{learnMore}</p>
        </details>
      </CardFooter>
    </Card>
  )
}

