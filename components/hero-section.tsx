"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { PawPrint, Heart, Users } from "lucide-react"

export default function HeroSection() {
  const [currentSlogan, setCurrentSlogan] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const slogans = [
    "Creating Pawsitive Change Together",
    "Building a Fur-Friendly Future",
    "Where Every Pet Feels at Home",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-amber-100 to-amber-50 overflow-hidden">
      {/* Animated background paw prints */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-200"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: -100,
              opacity: 0.7,
              scale: Math.random() * 1.5 + 0.5,
            }}
            animate={{
              y: "120vh",
              rotate: Math.random() * 360,
              opacity: [0.7, 0.8, 0.7, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 20,
            }}
          >
            <PawPrint size={Math.random() * 30 + 20} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-amber-800 mb-6">Pet-Friendly City Campaign</h1>

            <div className="h-16 flex items-center justify-center mb-8">
              <motion.h2
                key={currentSlogan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl text-amber-600 italic"
              >
                {slogans[currentSlogan]}
              </motion.h2>
            </div>

            <p className="text-lg text-gray-700 mb-8">
              Join our mission to transform our city into a haven for pets and their humans. Together, we can create
              spaces where every paw is welcome.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
                <Link href="#volunteer">
                  <Users className="mr-2 h-5 w-5" />
                  Volunteer Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                <Link href="#adopt">
                  <Heart className="mr-2 h-5 w-5" />
                  Adopt a Pet
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated illustration */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-contain bg-repeat-x bg-bottom"
        style={{
          backgroundImage: "url('/images/city-skyline.svg')",
        }}
        animate={{
          backgroundPositionX: ["0%", "100%"],
        }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </section>
  )
}
