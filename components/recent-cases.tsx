"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import DecorativeElement from "./3d/decorative-element"

const cases = [
  {
    title: "Corporate Fraud Defense",
    category: "Criminal Defense",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Successfully defended a corporate executive against allegations of financial fraud, resulting in all charges being dismissed.",
    result: "Case Dismissed",
  },
  {
    title: "Multi-Million Dollar Acquisition",
    category: "Corporate Law",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Guided a technology startup through a complex $50 million acquisition, ensuring regulatory compliance and favorable terms.",
    result: "Successful Acquisition",
  },
  {
    title: "High-Profile Divorce Settlement",
    category: "Family Law",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Represented a high-net-worth individual in a complex divorce case, securing equitable asset division and favorable custody arrangements.",
    result: "Favorable Settlement",
  },
  {
    title: "Intellectual Property Dispute",
    category: "Civil Litigation",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Protected a client's patent rights in a contentious intellectual property dispute against a major competitor.",
    result: "Case Won",
  },
]

export default function RecentCases() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-light/5 to-navy-dark/5 z-0"></div>

      {/* 3D Decorative Elements */}
      <DecorativeElement type="gavel" position="center-right" size="medium" opacity={0.15} />
      <DecorativeElement
        type="scales"
        position="center-left"
        size="medium"
        opacity={0.15}
        className="hidden md:block"
      />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-secondary font-medium text-lg">Case Studies</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 font-heading">
            Our Recent Success Stories
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore some of our recent cases and how we've helped our clients achieve favorable outcomes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cases.map((caseItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group"
            >
              <Card className="overflow-hidden h-full border-none shadow-lg card-hover">
                <div className="relative h-40 md:h-48">
                  <Image
                    src={caseItem.image || "/placeholder.svg"}
                    alt={caseItem.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <span className="text-xs font-medium text-secondary bg-secondary/20 px-2 py-1 rounded-full w-fit">
                      {caseItem.category}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-white mt-2">{caseItem.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4 md:p-6">
                  <p className="text-sm md:text-base text-muted-foreground mb-4">{caseItem.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm font-medium">Result:</span>
                    <span className="text-xs md:text-sm font-bold text-secondary">{caseItem.result}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 md:p-6 pt-0">
                  <Button
                    variant="link"
                    className="p-0 text-primary font-medium group-hover:text-secondary transition-colors"
                  >
                    Read Full Case Study
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8 md:mt-12"
        >
          <Link href="/case-studies">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
              View All Case Studies
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

