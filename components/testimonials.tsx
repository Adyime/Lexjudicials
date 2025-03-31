"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import DecorativeElement from "./3d/decorative-element"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Corporate Client",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The team at Justice Law provided exceptional service during our corporate restructuring. Their attention to detail and strategic approach saved us both time and money.",
  },
  {
    name: "Michael Chen",
    role: "Personal Injury Client",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "After my accident, I was overwhelmed with medical bills and insurance claims. Justice Law guided me through the entire process and secured a settlement that exceeded my expectations.",
  },
  {
    name: "Emily Rodriguez",
    role: "Family Law Client",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "During my divorce, the attorneys at Justice Law showed both compassion and fierce advocacy. They ensured my rights were protected while minimizing conflict.",
  },
  {
    name: "David Thompson",
    role: "Criminal Defense Client",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "When facing serious charges, Justice Law was my lifeline. Their criminal defense team built a strong case that resulted in all charges being dismissed.",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrent((prevCurrent) => {
      const nextIndex = prevCurrent + newDirection
      return nextIndex >= 0 && nextIndex < testimonials.length ? nextIndex : prevCurrent
    })
  }

  useEffect(() => {
    const startAutoplay = () => {
      timeoutRef.current = setTimeout(() => {
        setDirection(1)
        setCurrent((prevCurrent) => (prevCurrent + 1 < testimonials.length ? prevCurrent + 1 : 0))
      }, 5000)
    }

    startAutoplay()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current])

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-light/10 to-navy-dark/10 z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 z-0"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>

      {/* 3D Decorative Elements */}
      <DecorativeElement type="gavel" position="top-left" size="medium" opacity={0.15} />
      <DecorativeElement type="ring" position="bottom-right" size="medium" opacity={0.15} />

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-secondary font-medium text-lg">Testimonials</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 font-heading">What Our Clients Say</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Hear what our clients have to say about their experience working with our legal team.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -top-12 -left-12 opacity-20 hidden md:block">
            <Quote className="h-16 md:h-24 w-16 md:w-24 text-secondary" />
          </div>

          <div className="relative overflow-hidden h-[500px] sm:h-[450px] md:h-[400px] lg:h-[350px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                  <div className="relative h-[200px] md:h-[300px] rounded-lg overflow-hidden shadow-xl">
                    <Image src="/placeholder.svg?height=600&width=800" alt="Client" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 md:h-16 md:w-16 border-2 border-secondary">
                          <AvatarImage src={testimonials[current].image} alt={testimonials[current].name} />
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-lg md:text-xl font-bold">
                            {testimonials[current].name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-white text-lg md:text-xl">{testimonials[current].name}</h4>
                          <p className="text-white/80 text-sm md:text-base">{testimonials[current].role}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Card className="border-none shadow-lg bg-white/90 backdrop-blur-sm dark:bg-navy-dark/90">
                    <CardContent className="p-4 md:p-6 lg:p-8">
                      <Quote className="h-8 w-8 md:h-12 md:w-12 text-secondary opacity-20 mb-4 md:mb-6" />
                      <p className="text-base md:text-lg lg:text-xl italic mb-6 md:mb-8 font-heading">
                        "{testimonials[current].content}"
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          {testimonials.map((_, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              size="sm"
                              className={`w-3 h-3 p-0 rounded-full ${current === index ? "bg-secondary" : "bg-muted"}`}
                              onClick={() => {
                                setDirection(index > current ? 1 : -1)
                                setCurrent(index)
                              }}
                            >
                              <span className="sr-only">Go to slide {index + 1}</span>
                            </Button>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => paginate(-1)}
                            disabled={current === 0}
                            className="rounded-full"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => paginate(1)}
                            disabled={current === testimonials.length - 1}
                            className="rounded-full"
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

