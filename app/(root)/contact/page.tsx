import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us | Justice Law",
  description: "Get in touch with our legal team for expert advice and representation.",
}

export default function ContactPage() {
  return <ContactPageClient />
}

