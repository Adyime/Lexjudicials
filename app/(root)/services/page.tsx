import type { Metadata } from "next"
import ServicesPageClient from "./ServicesPageClient"

export const metadata: Metadata = {
  title: "Our Services | Justice Law",
  description: "Explore our comprehensive legal services across multiple practice areas.",
}

export default function ServicesPage() {
  return <ServicesPageClient />
}

