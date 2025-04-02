"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Team members data
const teamMembers = [
  {
    id: 1,
    name: "Adv. Abdul Gaffar",
    role: "Senior Partner",
    specialty: "Criminal Law",
    image: "/abdul.jpg",
    fallbackImage: "/placeholder-user.jpg",
    bio: "Adv. Abdul Gaffar is a prominent and dynamic lawyer renowned for his expertise in criminal, civil, and industrial legal practices. With a reputation as a skilled bail specialist, he has successfully represented numerous clients in complex legal matters. His dedication to justice and his sharp legal acumen have earned him recognition in the legal fraternity. Beyond his professional achievements, he is deeply committed to the betterment of society, actively engaging in pro bono work and advocating for marginalized communities.",

  },
  {
    id: 2,
    name: "Adv. Nakul Sharma",
    role: "Managing Partner",
    specialty: "Corporate Law",
    image: "/nakul.jpg",
    fallbackImage: "/placeholder-user.jpg",
    bio: "Nakul Sharma is not just a lawyer; he is a relentless force in the pursuit of justice. With unwavering dedication and an unbreakable spirit, he gives his everything to ensure his clients win when it matters the most. A risk-taker, an action-taker, and a strategist, Nakul Sharma thrives under pressure. When backed against the wall, he doesn't retreat—he breaks through. His commitment to justice is unmatched, and his determination to serve his clients and the needy never wavers.",

  },
  {
    id: 3,
    name: "Adv. Sameer Khan",
    role: "Senior Partner",
    specialty: "Criminal Defense",
    image: "/sameer.JPG",
    fallbackImage: "/placeholder-user.jpg",
    bio: "Advocate Sameer Khan is a name synonymous with fearless advocacy and relentless pursuit of justice. With a sharp legal mind and a bold courtroom presence, he is known for his unwavering dedication to his clients and his ability to dismantle even the most complex legal challenges. His approach to law is strategic and meticulous—every argument is calculated, every move is precise, ensuring that his clients receive the strongest legal representation possible.",

  },
  {
    id: 4,
    name: "Adv. Nadeem Khan",
    role: "Partner",
    specialty: "Family Law",
    image: "/nadeem.jpg",
    fallbackImage: "/placeholder-user.jpg",
    bio: "For Advocate Nadeem Khan, law is not just a profession—it is a mission to protect the vulnerable, uphold justice, and serve those who need it the most. With a strong background in human rights law, criminal defense, and social justice cases, he has earned a reputation as a champion of the underprivileged and a fierce protector of justice. His approach is deeply empathetic yet aggressively legal, striking a balance between understanding his clients' struggles and delivering ironclad legal representation.",

  },
  {
    id: 5,
    name: "Adv. Nasir hussain",
    role: "Partner",
    specialty: "Intellectual Property",
    image: "/nasir.jpg",
    fallbackImage: "/placeholder-user.jpg",
    bio: "Advocate Nasir Hussain is not just a legal professional—he is a master strategist, a relentless fighter, and a results-driven advocate who knows how to turn the tides in favor of his clients. With an exceptional understanding of the law and an innate ability to foresee every possible move in a legal battle, he approaches every case as a game that must be won on a partner basis—where his clients are not just spectators but empowered participants in their pursuit of justice.",

  },
  {
    id: 6,
    name: "Adv. Danish Khan",
    role: "Associate",
    specialty: "Real Estate Law",
    image: "/danish.jpg",
    fallbackImage: "/placeholder-user.jpg",
    bio: "Advocate Danish Khan is a name that resonates with precision, strategy, and an unwavering commitment to justice. He is not just a lawyer—he is a legal tactician who knows exactly which string to pull and when to pull it to ensure that justice prevails. With a deep understanding of the legal system, combined with years of experience and an instinct for strategic action, he has earned a reputation as one of the most formidable advocates in his field.",

  },
  {
    id: 7,
    name: "Adv. Sartaj tyagi",
    role: "Associate",
    specialty: "Immigration Law",
    image: "/sartaj.jpg",
    fallbackImage: "/placeholder-user.jpg",
    bio: "A legal battle is not just about arguments—it is about strategy, preparation, and execution, and no one understands this better than Advocate Sartaj Tyagi. Known for his tactical brilliance and deep understanding of legal complexities, he has successfully represented clients in corporate law, civil litigation, and high-stakes disputes. His analytical approach ensures that every legal strategy is airtight and backed by solid evidence, leaving no room for opposition.",

  },
  {
    id: 8,
    name: "Adv. Fatima Parveen",
    role: "Associate",
    specialty: "Family Law",
    image: "/FatimaParveen.jpeg",
    fallbackImage: "/placeholder-user.jpg",
    bio: "Advocate Fatima Parveen is a dedicated legal professional known for her expertise in family law and civil matters. With a strong background in legal practice, she has successfully represented numerous clients, ensuring justice and fair representation. Her commitment to legal excellence, attention to detail, and in-depth knowledge of the law make her a trusted advocate. She is passionate about upholding the rights of her clients and navigating complex legal challenges with skill and determination.",

  },
  {
    id: 9,
    name: "Adv. Shabnam Chaudhary",
    role: "Associate",
    specialty: "Civil Rights",
    image: "/Shabnamchaudhary.jpeg",
    fallbackImage: "/placeholder-user.jpg",
    bio: "Advocate Shabnam Chaudhary is a highly skilled and accomplished legal practitioner specializing in civil rights and human rights law. With a reputation for her analytical approach and persuasive advocacy, she has been instrumental in achieving favorable outcomes for her clients. Her dedication to justice, ethical practice, and strategic legal insights set her apart in the legal profession. She is committed to protecting the rights of individuals and businesses, ensuring that justice is served effectively and efficiently.",

  },
];

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<
    (typeof teamMembers)[0] | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openMemberDialog = (member: (typeof teamMembers)[0]) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

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
    <section className="py-16 md:py-20 bg-pattern">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-secondary font-medium text-lg">Our Team</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 font-heading">
            Meet Our Expert Attorneys
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Our team of experienced attorneys brings diverse expertise and a
            shared commitment to excellence in legal representation.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <Card
                className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => openMemberDialog(member)}
              >
                <div className={`relative ${member.id === 1 ? 'h-72 sm:h-68 md:h-72' : 'h-64 sm:h-60 md:h-64'}`}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={member.id <= 4}
                    className={`object-cover ${member.id === 1 ? 'object-[center_35%]' : 'object-top'} group-hover:scale-105 transition-transform duration-300`}
                    quality={member.id === 5 ? 75 : 90}
                    loading={member.id === 5 ? "lazy" : undefined}
                    onError={(e) => {
                      // @ts-ignore
                      e.target.src = member.fallbackImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-2">
                      {/* Social media links removed to fix type errors */}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-base md:text-lg font-bold font-heading">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-medium text-sm md:text-base">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-xs md:text-sm mt-1">
                    {member.specialty}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Member Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedMember && (
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-bold font-heading">
                {selectedMember.name}
              </DialogTitle>
              <DialogDescription className="text-secondary font-medium">
                {selectedMember.role} • {selectedMember.specialty}
              </DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover ${selectedMember.id === 1 ? 'object-[center_35%]' : 'object-top'}`}
                  quality={95}
                  priority
                  onError={(e) => {
                    // @ts-ignore
                    e.target.src = selectedMember.fallbackImage;
                  }}
                />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold mb-2">About</h4>
                <p className="text-muted-foreground text-sm md:text-base mb-4">
                  {selectedMember.bio}
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
