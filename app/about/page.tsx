import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "About Us - Pet-Friendly City Campaign",
  description: "Learn about our mission to create a more pet-friendly city and the team behind the campaign.",
}

// Sample team members data
const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Campaign Director",
    bio: "Sarah has been advocating for animal welfare for over 15 years. She founded the Pet-Friendly City Campaign after noticing the lack of pet-inclusive spaces in urban environments.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Volunteer Coordinator",
    bio: "With a background in community organizing, Michael manages our growing network of volunteers and ensures everyone can contribute their unique skills to the campaign.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Dr. Amelia Rodriguez",
    role: "Veterinary Advisor",
    bio: "Dr. Rodriguez provides expert guidance on animal health and welfare. She helps develop our educational materials and advises on pet-friendly infrastructure design.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Business Outreach Specialist",
    bio: "James works with local businesses to implement pet-friendly policies and practices. His background in retail management gives him insight into creating welcoming commercial spaces.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">About Our Campaign</h1>
          <p className="text-lg text-gray-700">
            Learn about our mission to create a more pet-friendly city and the team behind the campaign.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="relative h-80 md:h-full rounded-xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Pet-Friendly City Campaign team with pets"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              The Pet-Friendly City Campaign was founded in 2020 with a simple but powerful mission: to transform our
              city into a place where pets and their humans can thrive together. We believe that pets are family
              members, and our urban environments should reflect their importance in our lives.
            </p>
            <p className="text-gray-700 mb-4">
              Through advocacy, education, and community engagement, we work to create more pet-inclusive spaces,
              policies, and services throughout the city. From pet-friendly parks and businesses to housing policies
              that welcome furry family members, our goal is to remove barriers that separate pets from their people.
            </p>
            <p className="text-gray-700">
              We also recognize the profound impact that pets have on human wellbeing. By creating a more pet-friendly
              city, we're building a healthier, happier community for everyone who calls our city home.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-amber-800 mb-8 text-center">Our Impact By The Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">15+</div>
              <div className="text-gray-700">Pet-Friendly Parks Created</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-gray-700">Pets Adopted Through Events</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">100+</div>
              <div className="text-gray-700">Pet-Friendly Businesses</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">1,000+</div>
              <div className="text-gray-700">Active Volunteers</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-amber-800 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold mb-1 text-amber-800">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
