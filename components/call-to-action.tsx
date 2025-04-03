// "use client";

// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Phone, Mail, Clock, ArrowRight } from "lucide-react";
// import Image from "next/image";
// import DecorativeElement from "./3d/decorative-element";
// import Link from "next/link";

// export default function CallToAction() {
//   return (
//     <section className="py-16 md:py-24 relative overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy-DEFAULT to-navy-light z-0"></div>
//       <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 z-0"></div>

//       {/* Decorative Elements */}
//       {/* <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 z-0">
//         <Image
//           src="/placeholder.svg?height=800&width=600"
//           alt="Decorative"
//           fill
//           className="object-cover"
//         />
//       </div> */}
//       <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>

//       {/* 3D Decorative Elements */}
//       <DecorativeElement
//         type="scales"
//         position="top-left"
//         size="large"
//         opacity={0.15}
//         className="hidden md:block"
//       />
//       <DecorativeElement
//         type="gavel"
//         position="bottom-right"
//         size="medium"
//         opacity={0.15}
//       />

//       <div className="container px-4 md:px-6 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <span className="text-secondary font-medium text-lg">
//               Contact Us
//             </span>
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white font-heading">
//               Ready to Discuss Your Legal Needs?
//             </h2>
//             <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/80">
//               Our team of experienced attorneys is ready to help you navigate
//               your legal challenges. Schedule a consultation today and take the
//               first step toward resolving your legal matters.
//             </p>

//             <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
//               <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg">
//                 <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
//                   <div className="bg-secondary/20 p-2 md:p-3 rounded-full">
//                     <Phone className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
//                   </div>
//                   <h3 className="text-lg md:text-xl font-bold text-white">
//                     Call Us
//                   </h3>
//                 </div>
//                 <p className="text-white/80 mb-2">(555) 123-4567</p>
//                 <p className="text-white/60 text-xs md:text-sm">
//                   Available 24/7 for emergencies
//                 </p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg">
//                 <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
//                   <div className="bg-secondary/20 p-2 md:p-3 rounded-full">
//                     <Mail className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
//                   </div>
//                   <h3 className="text-lg md:text-xl font-bold text-white">
//                     Email Us
//                   </h3>
//                 </div>
//                 <p className="text-white/80 mb-2">contact@justicelaw.com</p>
//                 <p className="text-white/60 text-xs md:text-sm">
//                   We respond within 24 hours
//                 </p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg">
//                 <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
//                   <div className="bg-secondary/20 p-2 md:p-3 rounded-full">
//                     <Clock className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
//                   </div>
//                   <h3 className="text-lg md:text-xl font-bold text-white">
//                     Office Hours
//                   </h3>
//                 </div>
//                 <p className="text-white/80 mb-2">Monday - Friday: 9AM - 6PM</p>
//                 <p className="text-white/60 text-xs md:text-sm">
//                   Saturday: 10AM - 2PM
//                 </p>
//               </div>

//               <div className="bg-secondary/10 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-secondary/30">
//                 <h3 className="text-lg md:text-xl font-bold text-white mb-2">
//                   Free Initial Consultation
//                 </h3>
//                 <p className="text-white/80 mb-4">
//                   Schedule your 30-minute consultation with our expert
//                   attorneys.
//                 </p>
//                 <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
//                   Book Now <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             <Button
//               size="lg"
//               className="bg-white text-primary hover:bg-white/90 font-medium"
//               asChild
//             >
//               <Link href="/contact#consultation">
//                 Contact Us Today
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Link>
//             </Button>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-white p-4 md:p-8 rounded-lg shadow-2xl dark:bg-navy-dark/50 dark:backdrop-blur-sm"
//           >
//             <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground font-heading">
//               Request a Consultation
//             </h3>
//             <form className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="firstName"
//                     className="text-sm font-medium text-foreground"
//                   >
//                     First Name
//                   </label>
//                   <input
//                     id="firstName"
//                     type="text"
//                     className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="lastName"
//                     className="text-sm font-medium text-foreground"
//                   >
//                     Last Name
//                   </label>
//                   <input
//                     id="lastName"
//                     type="text"
//                     className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <label
//                   htmlFor="email"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label
//                   htmlFor="phone"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Phone
//                 </label>
//                 <input
//                   id="phone"
//                   type="tel"
//                   className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label
//                   htmlFor="service"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Service Needed
//                 </label>
//                 <select
//                   id="service"
//                   className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
//                   required
//                 >
//                   <option value="">Select a service</option>
//                   <option value="criminal">Criminal Defense</option>
//                   <option value="corporate">Corporate Law</option>
//                   <option value="civil">Civil Litigation</option>
//                   <option value="family">Family Law</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <div className="space-y-2">
//                 <label
//                   htmlFor="message"
//                   className="text-sm font-medium text-foreground"
//                 >
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   rows={4}
//                   className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-secondary"
//                   required
//                 ></textarea>
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 md:py-6 text-base md:text-lg font-medium"
//               >
//                 Submit Request
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>
//               <p className="text-xs text-center text-muted-foreground">
//                 By submitting this form, you agree to our{" "}
//                 <a href="#" className="underline">
//                   Privacy Policy
//                 </a>{" "}
//                 and{" "}
//                 <a href="#" className="underline">
//                   Terms of Service
//                 </a>
//                 .
//               </p>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, ArrowRight, Send, CheckCircle } from "lucide-react";
import Image from "next/image";
import DecorativeElement from "./3d/decorative-element";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function CallToAction() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Scroll to contact form section on page load if there's a hash in the URL
  useEffect(() => {
    if (window.location.hash === "#consultation") {
      const contactFormSection = document.getElementById("contact-form-section");
      if (contactFormSection) {
        contactFormSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for contacting us. We'll get back to you soon!",
        });

        setSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send the message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy-DEFAULT to-navy-light z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 z-0"></div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>

      {/* 3D Decorative Elements */}
      <DecorativeElement
        type="scales"
        position="top-left"
        size="large"
        opacity={0.15}
        className="hidden md:block"
      />
      <DecorativeElement
        type="gavel"
        position="bottom-right"
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
              Contact Us
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white font-heading">
              Ready to Discuss Your Legal Needs?
            </h2>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 text-white/80">
              Our team of experienced attorneys is ready to help you navigate
              your legal challenges. Schedule a consultation today and take the
              first step toward resolving your legal matters.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="bg-secondary/20 p-2 md:p-3 rounded-full">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    Call Us
                  </h3>
                </div>
                <p className="text-white/80 mb-2">+91 95609 68575</p>
                <p className="text-white/60 text-xs md:text-sm">
                  Available 24/7 for emergencies
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="bg-secondary/20 p-2 md:p-3 rounded-full">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    Email Us
                  </h3>
                </div>
                <p className="text-white/80 mb-2">office@lexjudis.com</p>
                <p className="text-white/60 text-xs md:text-sm">
                  We respond within 24 hours
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="bg-secondary/20 p-2 md:p-3 rounded-full">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    Office Hours
                  </h3>
                </div>
                <p className="text-white/80 mb-2">Monday - Friday: 9AM - 6PM</p>
                <p className="text-white/60 text-xs md:text-sm">
                  Saturday: 10AM - 2PM
                </p>
              </div>

              <div className="bg-secondary/10 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-secondary/30">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  Free Initial Consultation
                </h3>
                <p className="text-white/80 mb-4">
                  Schedule your 30-minute consultation with our expert
                  attorneys.
                </p>
                <Link href="/contact#consultation">
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-medium"
              asChild
            >
              <Link href="/contact#consultation">
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-4 md:p-8 rounded-lg shadow-2xl dark:bg-navy-dark/50 dark:backdrop-blur-sm"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground font-heading">
              Request a Consultation
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {success && (
                <div className="mb-4 flex items-center space-x-2 rounded-lg bg-green-100 p-3 text-green-700">
                  <CheckCircle className="h-5 w-5 text-green-700" />
                  <p>Message sent successfully! We'll contact you soon.</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-foreground"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-foreground"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="service"
                  className="text-sm font-medium text-foreground"
                >
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="criminal">Criminal Defense</option>
                  <option value="corporate">Corporate Law</option>
                  <option value="civil">Civil Litigation</option>
                  <option value="family">Family Law</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <Button
                type="submit"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-5 md:py-6 text-base md:text-lg font-medium"
                disabled={loading}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Request
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
