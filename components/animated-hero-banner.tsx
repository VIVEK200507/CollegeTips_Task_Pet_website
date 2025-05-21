"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AnimatedHeroBanner() {
  const [scrollY, setScrollY] = useState(0)
  const bannerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      if (bannerRef.current) {
        const rect = bannerRef.current.getBoundingClientRect()
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setScrollY(window.scrollY)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Parallax factors for different layers
  const cloudsFactor = 0.2
  const buildingsFactor = 0.4
  const midgroundFactor = 0.6
  const foregroundFactor = 0.8

  return (
    <div ref={bannerRef} className="relative w-full h-[90vh] overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100">
      {/* Sun */}
      <motion.div
        className="absolute top-[15%] right-[15%] w-32 h-32 rounded-full bg-yellow-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: [
            "0 0 20px 10px rgba(255,214,0,0.3)",
            "0 0 40px 20px rgba(255,214,0,0.5)",
            "0 0 20px 10px rgba(255,214,0,0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Clouds layer */}
      <div
        className="absolute inset-0 w-full h-full z-10"
        style={{
          transform: isMounted ? `translateY(${scrollY * cloudsFactor}px)` : "none",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 30}%`,
              opacity: 0.8 + Math.random() * 0.2,
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100 - 20}%`],
            }}
            transition={{
              duration: 20 + Math.random() * 40,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              filter: "blur(1px)",
            }}
          >
            <div className="bg-white rounded-full w-16 h-16 md:w-24 md:h-24 shadow-lg"></div>
            <div className="bg-white rounded-full w-20 h-20 md:w-32 md:h-32 absolute -top-6 -left-6 shadow-lg"></div>
            <div className="bg-white rounded-full w-16 h-16 md:w-24 md:h-24 absolute -top-4 left-10 shadow-lg"></div>
          </motion.div>
        ))}
      </div>

      {/* City skyline - background buildings */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40%] z-20"
        style={{
          transform: isMounted ? `translateY(${scrollY * buildingsFactor}px)` : "none",
        }}
      >
        <Image
          src="/images/city-skyline-bg.png"
          alt="City skyline background"
          fill
          className="object-cover object-bottom"
        />
      </div>

      {/* Midground elements - parks, trees */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[35%] z-30"
        style={{
          transform: isMounted ? `translateY(${scrollY * midgroundFactor}px)` : "none",
        }}
      >
        <Image
          src="/images/city-midground.png"
          alt="City parks and trees"
          fill
          className="object-cover object-bottom"
        />
      </div>

      {/* Animated pets in foreground */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] z-40"
        style={{
          transform: isMounted ? `translateY(${scrollY * foregroundFactor}px)` : "none",
        }}
      >
        {/* Dog */}
        <motion.div
          className="absolute bottom-[10%] left-[15%] w-24 h-24 md:w-32 md:h-32"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <Image src="/images/cartoon-dog.png" alt="Happy cartoon dog" width={130} height={130} />
        </motion.div>

        {/* Cat */}
        <motion.div
          className="absolute bottom-[15%] right-[20%] w-20 h-20 md:w-28 md:h-28"
          animate={{
            y: [0, -8, 0],
            rotate: [0, -3, 0, 3, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 0.5,
          }}
        >
          <Image src="/images/cartoon-cat.png" alt="Happy cartoon cat" width={110} height={110} />
        </motion.div>

        {/* Bird */}
        <motion.div
          className="absolute top-[40%] right-[30%] w-12 h-12 md:w-16 md:h-16"
          animate={{
            x: [0, 100, 200, 100, 0, -100, -200, -100, 0],
            y: [0, -20, 0, 20, 0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <Image src="/images/cartoon-bird.png" alt="Flying cartoon bird" width={60} height={60} />
        </motion.div>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-50 px-4">
        <div className="text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome to Our Pet-Friendly City
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
              Where every paw is welcome and every tail can wag freely
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                <Link href="#adopt">Find a Pet</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/80 hover:bg-white border-amber-500 text-amber-600"
              >
                <Link href="#volunteer">Get Involved</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
