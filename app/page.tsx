import { Button } from "@/components/ui/button"
import Link from "next/link"
import AnimatedHeroBanner from "@/components/animated-hero-banner"
import VolunteerForm from "@/components/volunteer-form"
import ImpactStories from "@/components/impact-stories"
import PetAdoptionCarousel from "@/components/pet-adoption-carousel"
import ChatbotIntegration from "@/components/chatbot-integration"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Animated Hero Banner */}
      <AnimatedHeroBanner />

      {/* Volunteer Sign-up Form */}
      <section id="volunteer" className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-amber-800">Join Our Pawsome Team</h2>
          <VolunteerForm />
        </div>
      </section>

      {/* Impact Stories */}
      <section id="impact-stories" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-amber-800">Impact Stories</h2>
          <ImpactStories />
          <div className="text-center mt-8">
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href="/impact-stories">View All Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* AI-powered Pet Adoption Carousel */}
      <section id="adopt" className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-amber-800">Find Your Perfect Companion</h2>
          <PetAdoptionCarousel />
          <div className="text-center mt-8">
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href="/adopt">View All Pets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Chatbot Integration */}
      <ChatbotIntegration />

      {/* Footer */}
      <Footer />
    </main>
  )
}
