import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-amber-800 text-amber-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Pet-Friendly City Campaign</h3>
            <p className="mb-4">
              Working together to create a city where pets and their humans can thrive. Join our mission to make every
              corner of our community welcoming to our furry friends.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-white transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/impact-stories" className="hover:text-white transition-colors">
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link href="/adopt" className="hover:text-white transition-colors">
                  Adopt
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-300" />
                <span>123 Pet Street, Pawville, PC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-amber-300" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-amber-300" />
                <span>info@petfriendlycity.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-700 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Pet-Friendly City Campaign. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
