"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Briefcase, Scale, Users } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamically import 3D components to avoid SSR issues
const DecorativeElement = dynamic(() => import("./3d/decorative-element"), {
  ssr: false,
});

const services = [
  {
    icon: <Shield className="h-10 w-10 text-secondary" />,
    title: "Criminal Defense",
    description:
      "Expert defense for all criminal charges including fraud, assault, drug offenses, and more.",
    items: ["Fraud", "Assault", "Drug Offenses", "Theft", "Domestic Violence"],
    image:
      "https://plus.unsplash.com/premium_photo-1723892425262-ccb9f6b6229d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Q3JpbWluYWwlMjBEZWZlbnNlfGVufDB8fDB8fHww",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-secondary" />,
    title: "Corporate Law",
    description:
      "Comprehensive legal services for businesses of all sizes, from startups to corporations.",
    items: [
      "Contract Disputes",
      "Intellectual Property",
      "Corporate Law",
      "Venture Capital",
      "Acquisitions",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    icon: <Scale className="h-10 w-10 text-secondary" />,
    title: "Civil Litigation",
    description:
      "Skilled representation in all types of civil disputes and litigation matters.",
    items: [
      "Personal Injury",
      "Property Disputes",
      "Contract Disputes",
      "Class Actions",
      "Tort Claims",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    icon: <Users className="h-10 w-10 text-secondary" />,
    title: "Family Law",
    description:
      "Compassionate guidance through family legal matters with sensitivity and expertise.",
    items: [
      "Divorce",
      "Child Custody",
      "Adoption",
      "Domestic Violence",
      "Property Settlements",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
];

export default function FeaturedServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 md:py-24 bg-pattern relative overflow-hidden">
      {/* 3D Decorative Elements - Only rendered client-side */}
      <div className="hidden md:block">
        <DecorativeElement
          type="scales"
          position="top-right"
          size="large"
          opacity={0.15}
        />
        <DecorativeElement
          type="book"
          position="bottom-left"
          size="medium"
          opacity={0.15}
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-secondary font-medium text-lg">
            Our Expertise
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-heading">
            Legal Practice Areas
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive legal services across multiple practice
            areas, delivering exceptional results with integrity and
            professionalism.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Service Tabs */}
          <div>
            <motion.div
              ref={ref}
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {services.map((service, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card
                    className={`transition-all duration-300 cursor-pointer card-hover ${
                      activeIndex === index ? "border-secondary shadow-lg" : ""
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setActiveIndex(index)}
                  >
                    <CardHeader className="flex flex-row items-center gap-4 p-4 md:p-6">
                      <div
                        className={`p-2 md:p-3 rounded-full ${
                          activeIndex === index
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base md:text-lg lg:text-xl font-heading">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-xs md:text-sm mt-1">
                          {service.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    {activeIndex === index && (
                      <CardContent className="px-4 pb-4 md:px-6 md:pb-6">
                        <ul className="space-y-2 mt-2">
                          {service.items.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              className="flex items-center gap-2"
                            >
                              <ChevronRight className="h-4 w-4 text-secondary flex-shrink-0" />
                              <span className="text-sm md:text-base">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                        {/* <Button
                          variant="link"
                          className="mt-4 p-0 text-secondary font-medium group"
                        >
                          Learn More
                          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </Button> */}
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Service Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl mt-8 lg:mt-0"
          >
            <Image
              src={services[activeIndex].image || "/placeholder.svg"}
              alt={services[activeIndex].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 md:p-6 lg:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-white font-heading mb-2">
                {services[activeIndex].title}
              </h3>
              <p className="text-white/80 mb-4 text-sm md:text-base">
                {services[activeIndex].description}
              </p>
              <Link href="/services">
              <Button className="w-fit bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Explore {services[activeIndex].title}
              </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8 md:mt-16"
        >
          <Link href="/services">
          <Button
            size="lg"
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary/10 font-medium"
          >
            View All Practice Areas
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
