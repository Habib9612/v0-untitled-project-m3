"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Truck, MapPin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-12 pb-16 sm:pb-24 bg-black">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-orange-500 text-sm font-medium mb-6">
                <span className="mr-1">⭐</span>
                <span>Top-rated logistics platform in Morocco</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">We Will</span>{" "}
                <span className="block text-orange-500 xl:inline">Delivery</span>{" "}
                <span className="block xl:inline">Your</span>{" "}
                <span className="block text-orange-500 xl:inline">Package!</span>
              </h1>

              <p className="mt-3 max-w-md mx-auto lg:mx-0 text-lg text-gray-400 sm:text-xl md:mt-5">
                Trust your package to us, we have been trusted by the whole world. Your package must be safe!
              </p>

              <div className="mt-10">
                <Link href="#get-quote">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Get In Touch
                  </Button>
                </Link>
              </div>

              {/* Key benefits */}
              <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-orange-500 text-2xl font-bold">10+</div>
                  <div className="text-gray-400 text-sm">Year Experience</div>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-orange-500 text-2xl font-bold">18k+</div>
                  <div className="text-gray-400 text-sm">Office</div>
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-orange-500 text-2xl font-bold">30k+</div>
                  <div className="text-gray-400 text-sm">Vehicles</div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="flex items-center text-gray-400">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-2" />
                  <span>No subscription fees</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-2" />
                  <span>Secure payments</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <CheckCircle className="h-5 w-5 text-orange-500 mr-2" />
                  <span>24/7 support</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-6 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <Card className="bg-gray-900 border-gray-800" id="get-quote">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white flex items-center">
                    <Truck className="h-6 w-6 text-orange-500 mr-2" />
                    Request a Quote
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <Input
                          placeholder="City, region, or address"
                          className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Destination</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <Input
                          placeholder="City, region, or address"
                          className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Weight (kg)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Pickup Date</label>
                        <Input
                          type="date"
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
                        />
                      </div>
                    </div>

                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Get Instant Quote</Button>

                    <p className="text-xs text-gray-500 text-center">
                      By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

