import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Impact Stories - Pet-Friendly City Campaign",
  description: "Read about the impact our campaign has made in creating a more pet-friendly city.",
}

// Sample expanded impact stories data
const impactStories = [
  {
    id: 1,
    title: "Park Transformation",
    category: "Infrastructure",
    description: "How we transformed Central Park into a pet paradise with dedicated play areas and water stations.",
    fullStory:
      "Our team of volunteers worked tirelessly over six months to transform Central Park into a pet paradise. We installed 15 water stations, created 3 dedicated off-leash play areas, and added pet waste stations throughout the park. The project was funded through community donations and a matching grant from the city council. Since the completion, pet visits to the park have increased by 70%, and we've received overwhelmingly positive feedback from both pet owners and non-pet owners alike.",
    image: "/placeholder.svg?height=600&width=800",
    date: "June 2023",
  },
  {
    id: 2,
    title: "Rescue Mission Success",
    category: "Rescue",
    description: "Our volunteers helped rescue and rehome over 50 animals during the recent flood emergency.",
    fullStory:
      "When the spring floods hit our city, many pets were separated from their families or left behind in the evacuation. Our emergency response team mobilized within hours, setting up a temporary shelter at the community center. Over the course of two weeks, our volunteers worked around the clock to rescue stranded animals, provide medical care, and reunite pets with their owners. For those animals whose owners couldn't be found, we launched a special adoption drive that found loving homes for every single rescued animal.",
    image: "/placeholder.svg?height=600&width=800",
    date: "August 2023",
  },
  {
    id: 3,
    title: "Pet-Friendly Business Initiative",
    category: "Community",
    description: "Local businesses joining our campaign to welcome pets in shops and restaurants.",
    fullStory:
      "Our Pet-Friendly Business Initiative has transformed the downtown shopping district. We worked with local business owners to develop pet-friendly policies, provided training for staff, and distributed welcome kits including water bowls, treats, and 'Pets Welcome' signage. Within the first three months, over 35 businesses joined the initiative, creating a continuous pet-friendly zone in the heart of our city. Shop owners report increased foot traffic and longer customer stays, while pet owners appreciate being able to bring their furry friends along while supporting local businesses.",
    image: "/placeholder.svg?height=600&width=800",
    date: "October 2023",
  },
  {
    id: 4,
    title: "Annual Adoption Fair",
    category: "Events",
    description: "Our biggest adoption event yet, finding forever homes for 120+ animals in a single weekend.",
    fullStory:
      "This year's Annual Adoption Fair broke all our previous records. Held at the city fairgrounds, the two-day event brought together 15 animal shelters and rescue organizations from across the region. With the help of 75 volunteers, we created a welcoming environment for potential adopters to meet available pets. Activities included training demonstrations, veterinary consultations, and a photo booth for new pet families. By the end of the weekend, 127 animals had found their forever homes - a 40% increase from last year's event.",
    image: "/placeholder.svg?height=600&width=800",
    date: "November 2023",
  },
  {
    id: 5,
    title: "Pet-Friendly Housing Policy",
    category: "Advocacy",
    description: "Working with city officials to implement pet-friendly housing policies for renters.",
    fullStory:
      "After a year-long advocacy campaign, the city council unanimously passed the Pet-Friendly Housing Ordinance. This groundbreaking legislation prevents landlords from implementing blanket 'no pets' policies and establishes reasonable pet deposit limits. Our team collected over 5,000 signatures, organized community forums, and presented research on the benefits of pet-friendly housing policies. The new ordinance, which goes into effect next month, is expected to reduce pet surrenders by an estimated 30% and make housing more accessible for pet owners across the city.",
    image: "/placeholder.svg?height=600&width=800",
    date: "January 2024",
  },
  {
    id: 6,
    title: "School Education Program",
    category: "Education",
    description: "Teaching the next generation about responsible pet ownership and animal welfare.",
    fullStory:
      "Our Pet Pals School Program has now reached over 5,000 students across 25 elementary schools. The curriculum, developed in partnership with veterinarians and educators, teaches children about responsible pet ownership, animal behavior, and compassion for all creatures. Each participating classroom receives a visit from therapy animals and their handlers, giving students hands-on experience with gentle animal interaction. Teachers report improved empathy among students and increased interest in animal welfare issues following the program.",
    image: "/placeholder.svg?height=600&width=800",
    date: "March 2024",
  },
  {
    id: 7,
    title: "Senior Companion Program",
    category: "Community",
    description: "Connecting senior citizens with pet companions to reduce loneliness and improve wellbeing.",
    fullStory:
      "The Senior Pet Companion Program pairs older adults with suitable pet companions, providing both the joy of animal companionship and the support needed to care for their new friends. Volunteers assist with pet care tasks like walking dogs or changing litter boxes, while our veterinary partners offer discounted services. The program has matched 45 seniors with pets in its first six months, with participants reporting decreased feelings of loneliness and increased physical activity. The success of this program has attracted attention from neighboring cities looking to implement similar initiatives.",
    image: "/placeholder.svg?height=600&width=800",
    date: "April 2024",
  },
  {
    id: 8,
    title: "Pet-Friendly Public Transportation",
    category: "Infrastructure",
    description: "Advocating for and implementing pet-friendly policies on buses and trains.",
    fullStory:
      "After two years of advocacy and collaboration with the city's transportation department, pets are now welcome on all public transportation. The new policy allows leashed dogs and cats in carriers on buses and trains during off-peak hours. To support this initiative, we installed pet waste stations at major transit hubs and created an educational campaign about responsible pet travel. Early data shows approximately 200 pet-accompanied trips per day, with minimal incidents reported. This change has made it easier for pet owners without cars to access veterinary care and pet-friendly destinations throughout the city.",
    image: "/placeholder.svg?height=600&width=800",
    date: "May 2024",
  },
]

export default function ImpactStoriesPage() {
  return (
    <main className="min-h-screen bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Impact Stories</h1>
          <p className="text-lg text-gray-700">
            Discover how our campaign is making a difference in creating a more pet-friendly city for all our furry
            friends and their humans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {impactStories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-600">{story.category}</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2 text-amber-800">{story.title}</h2>
                  <p className="text-sm text-gray-500 mb-4">{story.date}</p>
                </div>
                <p className="text-gray-700 mb-6">{story.fullStory}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
