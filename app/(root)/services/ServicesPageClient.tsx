"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Shield,
  Briefcase,
  Scale,
  Users,
  Building,
  Gavel,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const serviceCategories = [
  {
    id: "criminal",
    name: "Criminal Law",
    icon: <Shield className="h-6 w-6" />,
    description: "Expert defense for all criminal charges",
    services: [
      "Fraud",
      "Robbery",
      "Assault",
      "Drug Offenses",
      "Theft",
      "Domestic Violence",
      "Cybercrime",
      "Manslaughter",
      "Public Violence",
      "Hate Crime",
    ],
  },
  {
    id: "corporate",
    name: "Corporate Law",
    icon: <Briefcase className="h-6 w-6" />,
    description: "Comprehensive legal services for businesses",
    services: [
      "Breach of Contract",
      "Intellectual Property",
      "Labour Law",
      "Corporate Law",
      "Competition Law",
      "Venture Capital",
      "Partnership Disputes",
      "Shareholder Disputes",
      "Acquisition",
      "Securities Litigation",
    ],
  },
  {
    id: "civil",
    name: "Civil Litigation",
    icon: <Scale className="h-6 w-6" />,
    description: "Representation in civil disputes",
    services: [
      "Contract Disputes",
      "Class Action",
      "Tort Claims",
      "Personal Injury",
      "Employment Claims",
      "Property Disputes",
      "Professional Negligence",
      "Debt Claims",
      "Insurance Coverage",
      "Construction Disputes",
    ],
  },
  {
    id: "family",
    name: "Family Law",
    icon: <Users className="h-6 w-6" />,
    description: "Guidance through family legal matters",
    services: [
      "Divorce",
      "Child Custody",
      "Adoption",
      "Domestic Violence",
      "Property Settlements",
      "Maintenance",
      "Surrogacy",
      "Judicial Separation",
      "Mediation in Matrimonial Disputes",
      "Child Protective Proceedings",
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: <Building className="h-6 w-6" />,
    description: "Legal services for property matters",
    services: [
      "Property Transactions",
      "Landlord-Tenant Disputes",
      "Zoning Issues",
      "Construction Contracts",
      "Property Development",
      "Lease Agreements",
      "Title Disputes",
      "Mortgage Foreclosures",
      "Easements",
      "Land Use Regulations",
    ],
  },
  {
    id: "appellate",
    name: "Appellate Practice",
    icon: <Gavel className="h-6 w-6" />,
    description: "Appeals and higher court representation",
    services: [
      "Writ Petitions",
      "Appeals",
      "Supreme Court Cases",
      "High Court Matters",
      "Constitutional Challenges",
      "Judicial Review",
      "Administrative Appeals",
      "Habeas Corpus",
      "Civil Appeals",
      "Criminal Appeals",
    ],
  },
];

export default function ServicesPageClient() {
  const [activeTab, setActiveTab] = useState("criminal");
  const [expandedService, setExpandedService] = useState<string | null>(null);

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
    <main className="pt-24">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Our Legal Services
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Comprehensive legal solutions tailored to your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Tabs - Mobile Dropdown and Desktop Tabs */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <Tabs
            defaultValue="criminal"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Mobile Dropdown (visible on small screens) */}
            <div className="md:hidden mb-6">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a practice area" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Tabs (visible on medium screens and up) */}
            <div className="hidden md:block mb-16">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
                {serviceCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2"
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                      {category.icon}
                      {category.name}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground">
                      {category.description}. Our experienced attorneys provide
                      personalized legal solutions to protect your rights and
                      interests.
                    </p>
                  </div>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {category.services.map((service) => (
                      <motion.div key={service} variants={itemVariants}>
                        <Card
                          className={`cursor-pointer transition-all duration-300 h-full ${
                            expandedService === service
                              ? "shadow-lg"
                              : "hover:shadow-md"
                          }`}
                          onClick={() =>
                            setExpandedService(
                              expandedService === service ? null : service
                            )
                          }
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base md:text-lg flex justify-between items-center">
                              {service}
                              <ChevronRight
                                className={`h-5 w-5 transition-transform ${
                                  expandedService === service ? "rotate-90" : ""
                                }`}
                              />
                            </CardTitle>
                          </CardHeader>
                          {expandedService === service && (
                            <CardContent>
                              <CardDescription>
                                Our {service.toLowerCase()} services provide
                                comprehensive legal support tailored to your
                                specific situation. We handle all aspects of the
                                case, from initial consultation to resolution.
                              </CardDescription>
                            </CardContent>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Our Approach
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              We believe in a client-centered approach that combines legal
              expertise with personalized attention.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-background p-6 md:p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4">
                Consultation
              </h3>
              <p className="text-muted-foreground">
                We begin with a thorough consultation to understand your legal
                needs, goals, and concerns.
              </p>
            </div>

            <div className="bg-background p-6 md:p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4">
                Strategy Development
              </h3>
              <p className="text-muted-foreground">
                We develop a customized legal strategy tailored to your specific
                situation and objectives.
              </p>
            </div>

            <div className="bg-background p-6 md:p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-4">
                Execution & Resolution
              </h3>
              <p className="text-muted-foreground">
                We execute the strategy with precision and dedication, keeping
                you informed throughout the process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
