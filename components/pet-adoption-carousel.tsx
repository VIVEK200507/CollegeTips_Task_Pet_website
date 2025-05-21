"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ChevronLeft, ChevronRight, Filter, PawPrint } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Pet data interface
interface Pet {
  id: number
  name: string
  type: string
  breed: string
  age: string
  description: string
  image: string
  tags: string[]
  compatibility: string[]
}

// Sample pet data
const samplePets: Pet[] = [
  {
    id: 1,
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    description: "Friendly and energetic, loves to play fetch and go for walks.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["Friendly", "Active", "Trained"],
    compatibility: ["Families", "Active Lifestyle", "Other Dogs"],
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: "3 years",
    description: "Calm and affectionate, enjoys lounging in sunny spots.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["Quiet", "Affectionate", "Indoor"],
    compatibility: ["Quiet Homes", "Seniors", "First-time Owners"],
  },
  {
    id: 3,
    name: "Rocky",
    type: "Dog",
    breed: "German Shepherd",
    age: "4 years",
    description: "Intelligent and loyal, great for training and protection.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["Intelligent", "Loyal", "Protective"],
    compatibility: ["Experienced Owners", "Active Lifestyle", "Families"],
  },
  {
    id: 4,
    name: "Cleo",
    type: "Cat",
    breed: "Maine Coon",
    age: "1 year",
    description: "Playful and sociable, gets along well with children and other pets.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["Playful", "Sociable", "Young"],
    compatibility: ["Families", "Other Pets", "First-time Owners"],
  },
  {
    id: 5,
    name: "Cooper",
    type: "Dog",
    breed: "Beagle",
    age: "2 years",
    description: "Curious and friendly, loves outdoor adventures and sniffing around.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["Curious", "Friendly", "Energetic"],
    compatibility: ["Active Lifestyle", "Families", "Other Dogs"],
  },
  {
    id: 6,
    name: "Milo",
    type: "Cat",
    breed: "Tabby",
    age: "5 years",
    description: "Independent and calm, prefers a peaceful environment.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["Independent", "Calm", "Adult"],
    compatibility: ["Quiet Homes", "Seniors", "Single Owners"],
  },
  {
    id: 7,
    name: "Bella",
    type: "Dog",
    breed: "Labrador Retriever",
    age: "3 years",
    description: "Sweet and gentle, loves swimming and playing with toys.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["Sweet", "Gentle", "Active"],
    compatibility: ["Families", "Active Lifestyle", "Water Activities"],
  },
  {
    id: 8,
    name: "Oliver",
    type: "Cat",
    breed: "Scottish Fold",
    age: "2 years",
    description: "Curious and playful, loves interactive toys and climbing.",
    image: "/placeholder.svg?height=400&width=400",
    tags: ["Curious", "Playful", "Climber"],
    compatibility: ["Interactive Owners", "Multi-level Homes", "Families"],
  },
]

export default function PetAdoptionCarousel() {
  const [pets, setPets] = useState<Pet[]>(samplePets)
  const [filteredPets, setFilteredPets] = useState<Pet[]>(samplePets)
  const [petType, setPetType] = useState("all")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoScroll, setAutoScroll] = useState(true)
  const [favorites, setFavorites] = useState<number[]>([])
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  // Responsive items per view
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1
      if (window.innerWidth < 1024) return 2
      return 3
    }
    return 3 // Default for SSR
  }

  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView())
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Filter pets by type
  useEffect(() => {
    if (petType === "all") {
      setFilteredPets(pets)
    } else {
      setFilteredPets(pets.filter((pet) => pet.type.toLowerCase() === petType.toLowerCase()))
    }
    setCurrentIndex(0)
  }, [petType, pets])

  // Auto-scroll functionality
  useEffect(() => {
    if (autoScroll) {
      autoScrollRef.current = setInterval(() => {
        const maxIndex = Math.max(0, filteredPets.length - itemsPerView)
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
      }, 5000)
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [autoScroll, filteredPets.length, itemsPerView])

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setAutoScroll(false)
  const handleMouseLeave = () => setAutoScroll(true)

  // Navigation functions
  const nextSlide = () => {
    const maxIndex = Math.max(0, filteredPets.length - itemsPerView)
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((petId) => petId !== id) : [...prev, id]))
  }

  return (
    <div
      className="relative w-full py-8 px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={carouselRef}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-amber-600" />
          <Select value={petType} onValueChange={setPetType}>
            <SelectTrigger className="w-[180px] border-amber-200">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pets</SelectItem>
              <SelectItem value="dog">Dogs</SelectItem>
              <SelectItem value="cat">Cats</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="border-amber-200 hover:bg-amber-100"
          >
            <ChevronLeft className="h-5 w-5 text-amber-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= filteredPets.length - itemsPerView}
            className="border-amber-200 hover:bg-amber-100"
          >
            <ChevronRight className="h-5 w-5 text-amber-600" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{
            x: `-${(currentIndex * 100) / itemsPerView}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          {filteredPets.map((pet) => (
            <motion.div
              key={pet.id}
              className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.333%] px-2"
              style={{
                width: `${100 / itemsPerView}%`,
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-amber-200">
                <div className="relative h-64 overflow-hidden bg-amber-50">
                  <Image
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm ${
                      favorites.includes(pet.id) ? "text-red-500" : "text-gray-400"
                    }`}
                    onClick={() => toggleFavorite(pet.id)}
                  >
                    <Heart className={`h-5 w-5 ${favorites.includes(pet.id) ? "fill-current" : ""}`} />
                  </Button>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-amber-600">{pet.type}</Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{pet.name}</h3>
                    <p className="text-sm text-white/90">
                      {pet.breed} • {pet.age}
                    </p>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-gray-700 mb-3">{pet.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {pet.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">Best suited for:</p>
                    <ul className="list-disc list-inside">
                      {pet.compatibility.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-amber-100 p-4">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 gap-2">
                    <PawPrint className="h-4 w-4" />
                    Meet {pet.name}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-6 gap-1">
        {[...Array(Math.ceil(filteredPets.length - itemsPerView + 1))].map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-6 bg-amber-600" : "w-2 bg-amber-300"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-scroll indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-100 overflow-hidden">
        <AnimatePresence>
          {autoScroll && (
            <motion.div
              className="h-full bg-amber-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              exit={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              key="progress"
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
