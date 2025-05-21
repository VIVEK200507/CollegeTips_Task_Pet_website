import VolunteerForm from "@/components/volunteer-form"

export const metadata = {
  title: "Volunteer - Pet-Friendly City Campaign",
  description: "Join our team of volunteers and help make our city more pet-friendly.",
}

export default function VolunteerPage() {
  return (
    <main className="min-h-screen bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Join Our Volunteer Team</h1>
          <p className="text-lg text-gray-700">
            Our volunteers are the heart of our campaign. Together, we can create a more pet-friendly city for all our
            furry friends and their humans.
          </p>
        </div>

        <VolunteerForm />
      </div>
    </main>
  )
}
