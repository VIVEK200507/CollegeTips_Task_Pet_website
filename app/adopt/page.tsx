import PetAdoptionCarousel from "@/components/pet-adoption-carousel"

export const metadata = {
  title: "Adopt a Pet - Pet-Friendly City Campaign",
  description: "Find your perfect companion and give a loving home to a pet in need.",
}

export default function AdoptPage() {
  return (
    <main className="min-h-screen bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Adopt a Pet</h1>
          <p className="text-lg text-gray-700">
            Find your perfect companion and give a loving home to a pet in need. Our AI-powered matching system helps
            connect you with pets that fit your lifestyle.
          </p>
        </div>

        <div className="mb-16">
          <PetAdoptionCarousel />
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">Adoption Process</h2>
          <ol className="space-y-4 text-gray-700">
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg">Browse Available Pets</h3>
                <p>
                  Look through our selection of pets waiting for their forever homes. Use filters to find pets that
                  match your preferences.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg">Submit an Application</h3>
                <p>
                  Once you find a pet you're interested in, fill out our adoption application form. This helps us ensure
                  a good match between pets and adopters.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg">Meet Your Potential Pet</h3>
                <p>
                  Schedule a meet-and-greet with the pet you're interested in. This is a chance for you to interact and
                  see if you're a good match.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-lg">Home Check</h3>
                <p>
                  For some pets, we conduct a brief home check to ensure the environment is safe and suitable for the
                  specific pet.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-semibold text-lg">Finalize the Adoption</h3>
                <p>
                  Complete the adoption paperwork, pay any applicable adoption fees, and welcome your new pet into your
                  family!
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </main>
  )
}
