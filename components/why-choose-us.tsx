"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, BookOpen, Scale, Briefcase } from "lucide-react";
import Image from "next/image";
import DecorativeElement from "./3d/decorative-element";

const features = [
  {
    icon: <Shield className="h-10 w-10 text-secondary" />,
    title: "Expert Legal Team",
    description:
      "Our attorneys bring decades of combined experience across all practice areas.",
  },
  {
    icon: <Award className="h-10 w-10 text-secondary" />,
    title: "Award-Winning Service",
    description:
      "Recognized excellence with multiple industry awards and peer recognitions.",
  },
  {
    icon: <Users className="h-10 w-10 text-secondary" />,
    title: "Client-Centered Approach",
    description:
      "We prioritize your needs with personalized legal strategies and constant communication.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-secondary" />,
    title: "Extensive Resources",
    description:
      "Access to comprehensive legal resources and a network of expert consultants.",
  },
  {
    icon: <Scale className="h-10 w-10 text-secondary" />,
    title: "Proven Track Record",
    description:
      "Consistent success with thousands of cases resolved favorably for our clients.",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-secondary" />,
    title: "Transparent Pricing",
    description:
      "Clear fee structures with no hidden costs and flexible payment options.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-pattern">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>

      {/* 3D Decorative Elements */}
      <DecorativeElement
        type="pillar"
        position="top-right"
        size="medium"
        opacity={0.15}
      />
      <DecorativeElement
        type="book"
        position="bottom-left"
        size="medium"
        opacity={0.15}
      />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-secondary font-medium text-lg">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 font-heading">
              Committed to Excellence in Legal Services
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-muted-foreground">
              At Justice Law, we combine legal expertise with a deep commitment
              to our clients' success. Our approach is built on integrity,
              innovation, and personalized attention to every case.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow card-hover">
                    <CardContent className="p-4 md:p-6">
                      <div className="bg-primary/10 p-2 md:p-3 rounded-lg w-fit mb-3 md:mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 font-heading">
                        {feature.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://plus.unsplash.com/premium_photo-1661497281000-b5ecb39a2114?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxhd3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Legal Team"
                fill
                className="object-cover"
              />

              {/* Stats Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white font-heading mb-4 md:mb-6">
                  Our Impact
                </h3>

                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                    <h4 className="text-3xl md:text-4xl font-bold text-secondary mb-1 font-heading">
                      98%
                    </h4>
                    <p className="text-white/80 text-sm md:text-base">
                      Success Rate
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                    <h4 className="text-3xl md:text-4xl font-bold text-secondary mb-1 font-heading">
                      5,000+
                    </h4>
                    <p className="text-white/80 text-sm md:text-base">
                      Cases Won
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                    <h4 className="text-3xl md:text-4xl font-bold text-secondary mb-1 font-heading">
                      25+
                    </h4>
                    <p className="text-white/80 text-sm md:text-base">
                      Years Experience
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-lg">
                    <h4 className="text-3xl md:text-4xl font-bold text-secondary mb-1 font-heading">
                      50+
                    </h4>
                    <p className="text-white/80 text-sm md:text-base">
                      Expert Attorneys
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/10 rounded-full z-[-1]"></div>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-secondary/20 rounded-full z-[-1]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
