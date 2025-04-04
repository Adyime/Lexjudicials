// "use client";

// import type React from "react";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

// export default function ContactPageClient() {
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   // Scroll to contact form section on page load if there's a hash in the URL
//   useEffect(() => {
//     // Check if URL has #consultation hash
//     if (window.location.hash === "#consultation") {
//       const contactFormSection = document.getElementById(
//         "contact-form-section"
//       );
//       if (contactFormSection) {
//         contactFormSection.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // In a real application, you would handle the form submission here
//     setFormSubmitted(true);
//     setTimeout(() => setFormSubmitted(false), 5000);
//   };

//   return (
//     <main className="pt-24 overflow-x-hidden">
//       {/* Hero Section - Shorter */}
//       <section className="bg-primary text-primary-foreground py-10 md:py-12">
//         <div className="container px-4 md:px-6">
//           <div className="max-w-3xl mx-auto text-center">
//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
//               Contact Us
//             </h1>
//             <p className="text-lg md:text-xl text-primary-foreground/80">
//               Get in touch with our legal team for expert advice and
//               representation.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Contact Form and Map - Immediately visible */}
//       <section id="contact-form-section" className="py-10 md:py-16">
//         <div className="container px-4 md:px-6">
//           <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">
//             {/* Contact Form */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Send Us a Message</CardTitle>
//                 <CardDescription>
//                   Fill out the form below and our team will get back to you as
//                   soon as possible.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <label
//                         htmlFor="firstName"
//                         className="text-sm font-medium"
//                       >
//                         First Name
//                       </label>
//                       <Input id="firstName" type="text" required />
//                     </div>
//                     <div className="space-y-2">
//                       <label htmlFor="lastName" className="text-sm font-medium">
//                         Last Name
//                       </label>
//                       <Input id="lastName" type="text" required />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <label htmlFor="email" className="text-sm font-medium">
//                       Email
//                     </label>
//                     <Input id="email" type="email" required />
//                   </div>
//                   <div className="space-y-2">
//                     <label htmlFor="phone" className="text-sm font-medium">
//                       Phone
//                     </label>
//                     <Input id="phone" type="tel" />
//                   </div>
//                   <div className="space-y-2">
//                     <label htmlFor="subject" className="text-sm font-medium">
//                       Subject
//                     </label>
//                     <Input id="subject" type="text" required />
//                   </div>
//                   <div className="space-y-2">
//                     <label htmlFor="message" className="text-sm font-medium">
//                       Message
//                     </label>
//                     <Textarea id="message" rows={5} required />
//                   </div>
//                   <Button
//                     type="submit"
//                     className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
//                   >
//                     {formSubmitted ? (
//                       <span className="flex items-center gap-2">
//                         <CheckCircle className="h-4 w-4" />
//                         Message Sent
//                       </span>
//                     ) : (
//                       "Send Message"
//                     )}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>

//             {/* Map and Contact Info */}
//             <div className="flex flex-col gap-6">
//               {/* Map */}
//               <div className="h-[300px] rounded-lg overflow-hidden border">
//                 {/* In a real application, you would embed a Google Map here */}
//                 <div className="w-full h-full bg-muted flex items-center justify-center">
//                   <div className="text-center p-6">
//                     <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                     <h3 className="text-lg font-bold mb-2">Our Location</h3>
//                     <p className="text-muted-foreground">
//                       123 Legal Avenue, Suite 500
//                       <br />
//                       New York, NY 10001
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact Info Cards */}
//               <div className="grid grid-cols-2 gap-4">
//                 <Card className="h-full">
//                   <CardContent className="p-4 flex flex-col items-center text-center">
//                     <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
//                       <Phone className="h-5 w-5 text-primary" />
//                     </div>
//                     <h3 className="text-base font-bold mb-1">Phone</h3>
//                     <p className="text-sm text-muted-foreground">
//                       (555) 123-4567
//                     </p>
//                   </CardContent>
//                 </Card>

//                 <Card className="h-full">
//                   <CardContent className="p-4 flex flex-col items-center text-center">
//                     <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
//                       <Mail className="h-5 w-5 text-primary" />
//                     </div>
//                     <h3 className="text-base font-bold mb-1">Email</h3>
//                     <p className="text-sm text-muted-foreground">
//                       info@justicelaw.com
//                     </p>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>

//           {/* Contact Information Cards - Moved below */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//             <Card className="h-full">
//               <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
//                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                   <MapPin className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-lg font-bold mb-2">Our Location</h3>
//                 <p className="text-muted-foreground">
//                   123 Legal Avenue, Suite 500
//                   <br />
//                   New York, NY 10001
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="h-full">
//               <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
//                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                   <Phone className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-lg font-bold mb-2">Phone</h3>
//                 <p className="text-muted-foreground">
//                   Main: (555) 123-4567
//                   <br />
//                   Toll-free: (800) 987-6543
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="h-full">
//               <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
//                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                   <Mail className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-lg font-bold mb-2">Email</h3>
//                 <p className="text-muted-foreground">
//                   info@justicelaw.com
//                   <br />
//                   support@justicelaw.com
//                 </p>
//               </CardContent>
//             </Card>

//             <Card className="h-full">
//               <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
//                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
//                   <Clock className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-lg font-bold mb-2">Office Hours</h3>
//                 <p className="text-muted-foreground">
//                   Monday - Friday: 9AM - 6PM
//                   <br />
//                   Saturday: 10AM - 2PM
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-12 md:py-16 bg-muted">
//         <div className="container px-4 md:px-6">
//           <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold mb-4">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-lg text-muted-foreground">
//               Find answers to common questions about our services and
//               consultation process.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">
//                   What should I bring to my initial consultation?
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   For your initial consultation, please bring any relevant
//                   documents related to your case, such as contracts,
//                   correspondence, police reports, or medical records. This will
//                   help our attorneys provide a more accurate assessment of your
//                   situation.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">
//                   How much does an initial consultation cost?
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   We offer a complimentary 30-minute initial consultation for
//                   most practice areas. During this meeting, we'll discuss your
//                   legal needs and determine the best course of action. Specific
//                   fee structures will be discussed after the initial assessment.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">
//                   How long will my case take to resolve?
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   The timeline for resolving legal matters varies significantly
//                   depending on the complexity of the case, court schedules, and
//                   other factors. During your consultation, our attorneys will
//                   provide an estimated timeline based on your specific
//                   situation.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">
//                   Do you offer payment plans?
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   Yes, we offer flexible payment options and plans tailored to
//                   your financial situation. We believe that quality legal
//                   representation should be accessible to everyone, and we're
//                   committed to working with you to find a payment structure that
//                   fits your needs.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPageClient() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
          name: "",
          email: "",
          phone: "",
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
    <main className="pt-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-10 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              Get in touch with our legal team for expert advice and
              representation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section id="contact-form-section" className="py-10 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and our team will get back to you as
                  soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {success && (
                  <div className="mb-4 flex items-center space-x-2 rounded-lg bg-green-100 p-3 text-green-700">
                    <CheckCircle className="h-5 w-5 text-green-700" />
                    <p>Message sent successfully! We'll contact you soon.</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <label htmlFor="firstName" className="text-sm font-medium text-foreground">
        First Name
      </label>
      <Input
        id="firstName"
        name="firstName"
        type="text"
        required
        value={formData.firstName}
        onChange={handleChange}
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="lastName" className="text-sm font-medium text-foreground">
        Last Name
      </label>
      <Input
        id="lastName"
        name="lastName"
        type="text"
        required
        value={formData.lastName}
        onChange={handleChange}
      />
    </div>
  </div>
  <div className="space-y-2">
    <label htmlFor="email" className="text-sm font-medium text-foreground">
      Email
    </label>
    <Input
      id="email"
      name="email"
      type="email"
      required
      value={formData.email}
      onChange={handleChange}
    />
  </div>
  <div className="space-y-2">
    <label htmlFor="phone" className="text-sm font-medium text-foreground">
      Phone
    </label>
    <Input
      id="phone"
      name="phone"
      type="tel"
      required
      value={formData.phone}
      onChange={handleChange}
    />
  </div>
  <div className="space-y-2">
    <label htmlFor="service" className="text-sm font-medium text-foreground">
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
    <label htmlFor="message" className="text-sm font-medium text-foreground">
      Message
    </label>
    <Textarea
      id="message"
      name="message"
      rows={4}
      required
      value={formData.message}
      onChange={handleChange}
      className="min-h-[120px]"
    />
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

              </CardContent>
            </Card>

            {/* Map and Contact Info */}
            <div className="flex flex-col gap-6">
              <div className="h-[300px] rounded-lg overflow-hidden border">
                <div className="w-full h-full bg-muted flex items-center justify-center">
                    <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3501.540534297116!2d77.27840007550118!3d28.643529675658733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM4JzM2LjciTiA3N8KwMTYnNTEuNSJF!5e0!3m2!1sen!2sin!4v1743597579510!5m2!1sen!2sin"
          width="200%"
          height="200%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="h-full">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold mb-1">Phone</h3>
                    <p className="text-sm text-muted-foreground">
                    +91 95609 68575
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-full">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-bold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      office@lexjudis.com
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="h-full">
              <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Our Location</h3>
                <p className="text-muted-foreground">
                  Office No.8, Shiva Market, Nr Khureji  Red Light,
                  <br />
                   Khureji Delhi-110051
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Phone</h3>
                <p className="text-muted-foreground">
                  +91 95609 68575
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Email</h3>
                <p className="text-muted-foreground">
                  office@lexjudis.com
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Office Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9AM - 6PM
                  <br />
                  Saturday: 10AM - 2PM
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our services and
              consultation process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What should I bring to my initial consultation?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For your initial consultation, please bring any relevant
                  documents related to your case, such as contracts,
                  correspondence, police reports, or medical records. This will
                  help our attorneys provide a more accurate assessment of your
                  situation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How much does an initial consultation cost?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a complimentary 30-minute initial consultation for
                  most practice areas. During this meeting, we'll discuss your
                  legal needs and determine the best course of action. Specific
                  fee structures will be discussed after the initial assessment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How long will my case take to resolve?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The timeline for resolving legal matters varies significantly
                  depending on the complexity of the case, court schedules, and
                  other factors. During your consultation, our attorneys will
                  provide an estimated timeline based on your specific
                  situation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Do you offer payment plans?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, we offer flexible payment options and plans tailored to
                  your financial situation. We believe that quality legal
                  representation should be accessible to everyone, and we're
                  committed to working with you to find a payment structure that
                  fits your needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
