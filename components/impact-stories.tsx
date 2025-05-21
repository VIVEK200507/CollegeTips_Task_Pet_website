"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample impact stories data
const impactStories = [
  {
    id: 1,
    title: "Park Transformation",
    category: "Infrastructure",
    description: "How we transformed Central Park into a pet paradise with dedicated play areas and water stations.",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 2023",
  },
  {
    id: 2,
    title: "Rescue Mission Success",
    category: "Rescue",
    description: "Our volunteers helped rescue and rehome over 50 animals during the recent flood emergency.",
    image: "/placeholder.svg?height=400&width=600",
    date: "August 2023",
  },
  {
    id: 3,
    title: "Pet-Friendly Business Initiative",
    category: "Community",
    description: "Local businesses joining our campaign to welcome pets in shops and restaurants.",
    image: "/placeholder.svg?height=400&width=600",
    date: "October 2023",
  },
  {
    id: 4,
    title: "Annual Adoption Fair",
    category: "Events",
    description: "Our biggest adoption event yet, finding forever homes for 120+ animals in a single weekend.",
    image: "/placeholder.svg?height=400&width=600",
    date: "November 2023",
  },
  {
    id: 5,
    title: "Pet-Friendly Housing Policy",
    category: "Advocacy",
    description: "Working with city officials to implement pet-friendly housing policies for renters.",
    image: "/placeholder.svg?height=400&width=600",
    date: "January 2024",
  },
]

export default function ImpactStories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const totalSlides = impactStories.length
  const slidesToShow = 3
  const maxIndex = totalSlides - slidesToShow

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Reset autoplay when user interacts
  const handleManualNavigation = (callback: () => void) => {
    setIsAutoPlaying(false)
    callback()

    // Resume autoplay after 5 seconds of inactivity
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current)
    }

    autoPlayRef.current = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 5000)
  }

  // Autoplay functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        nextSlide()
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, currentIndex])

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }, [])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{
            x: `-${currentIndex * (100 / slidesToShow)}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          {impactStories.map((story) => (
            <div
              key={story.id}
              className="min-w-[33.333%] px-3"
              style={{
                width: `${100 / slidesToShow}%`,
              }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-amber-600">{story.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-amber-800">{story.title}</h3>
                  <p className="text-gray-600 mb-3">{story.description}</p>
                  <p className="text-sm text-gray-500">{story.date}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-md border-amber-200 z-10"
        onClick={() => handleManualNavigation(prevSlide)}
      >
        <ChevronLeft className="h-5 w-5 text-amber-600" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full shadow-md border-amber-200 z-10"
        onClick={() => handleManualNavigation(nextSlide)}
      >
        <ChevronRight className="h-5 w-5 text-amber-600" />
      </Button>

      <div className="flex justify-center mt-6 gap-1">
        {[...Array(maxIndex + 1)].map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-amber-600" : "w-2 bg-amber-300"
            }`}
            onClick={() => handleManualNavigation(() => setCurrentIndex(index))}
          />
        ))}
      </div>
    </div>
  )
}
