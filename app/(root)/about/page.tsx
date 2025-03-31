import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TeamSection from "@/components/team-section";

export const metadata: Metadata = {
  title: "About Us | Justice Law",
  description:
    "Learn about our law firm's history, values, and experienced team of attorneys.",
};

export default function AboutPage() {
  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              About Justice Law
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80">
              A premier law firm dedicated to excellence, integrity, and client
              success since 1995.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
                Our Story
              </h2>
              <p className="text-base md:text-lg mb-4 text-muted-foreground">
                Lex Judis Law Associates has been a trusted name in the legal
                field since 2007, dedicated to delivering reliable,
                result-oriented, and client-centric legal solutions. With a
                strong commitment to excellence, we serve individuals,
                corporations, agencies, and businesses by offering comprehensive
                legal advice and remedies tailored to their unique needs. Our
                firm stands as a pillar of legal support, assisting clients at
                every stage—from the root of a legal issue to its resolution.
                Whether it's litigation, corporate advisory, compliance, dispute
                resolution, or legal consultancy, we ensure effective
                representation and strategic solutions.
              </p>
              <p className="text-base md:text-lg mb-6 text-muted-foreground">
                At Lex Judis Law Associates, we prioritize professionalism,
                integrity, and efficiency, ensuring that our clients receive the
                best possible legal remedies with the utmost transparency. With
                a team of experienced legal professionals, we leverage our
                expertise to protect our clients' rights and interests, making
                justice accessible to all. Our firm is committed to providing
                end-to-end legal services with the highest standards, making us
                a trusted legal ally for individuals and businesses alike. Lex
                Judis Law Associates – Your Partner in Justice.
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Meet Our Team
              </Button>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://plus.unsplash.com/premium_photo-1695449439526-9cebdbfa1a2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGxhdyUyMGNvdXJ0JTIwaW5kaWF8ZW58MHx8MHx8fDA%3D"
                alt="Law firm office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-background p-6 md:p-8 rounded-lg shadow-md">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                Excellence
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                We strive for excellence in every aspect of our practice, from
                legal research and strategy to client communication and case
                management.
              </p>
            </div>
            <div className="bg-background p-6 md:p-8 rounded-lg shadow-md">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                Integrity
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                We uphold the highest ethical standards in our practice,
                ensuring transparency, honesty, and accountability in all client
                interactions.
              </p>
            </div>
            <div className="bg-background p-6 md:p-8 rounded-lg shadow-md">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                Client Focus
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                We prioritize our clients' needs and objectives, tailoring our
                approach to deliver personalized legal solutions that achieve
                optimal results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Timeline - Completely redesigned for mobile responsiveness */}
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
            Our Journey
          </h2>

          {/* Mobile Timeline (visible on small screens) */}
          <div className="md:hidden space-y-8">
            <div className="bg-background p-6 rounded-lg shadow-md border-l-4 border-secondary">
              <h3 className="text-lg font-bold mb-2">2007</h3>
              <p className="text-muted-foreground text-sm">
                Lex Judis Law Associates was founded with a vision to deliver
                reliable, result-oriented legal solutions.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-md border-l-4 border-secondary">
              <h3 className="text-lg font-bold mb-2">2010</h3>
              <p className="text-muted-foreground text-sm">
                Expanded our practice areas to include corporate advisory and
                compliance services.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-md border-l-4 border-secondary">
              <h3 className="text-lg font-bold mb-2">2015</h3>
              <p className="text-muted-foreground text-sm">
                Established comprehensive dispute resolution and litigation
                services for businesses and individuals.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-md border-l-4 border-secondary">
              <h3 className="text-lg font-bold mb-2">2020</h3>
              <p className="text-muted-foreground text-sm">
                Strengthened our position as a trusted legal ally for both
                individuals and corporations.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-md border-l-4 border-secondary">
              <h3 className="text-lg font-bold mb-2">Today</h3>
              <p className="text-muted-foreground text-sm">
                Continue to provide end-to-end legal services with the highest
                standards of professionalism and integrity.
              </p>
            </div>
          </div>

          {/* Desktop Timeline (visible on medium screens and up) */}
          <div className="hidden md:block relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-secondary border-4 border-background"></div>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right">
                    <h3 className="text-xl font-bold mb-2">2007</h3>
                    <p className="text-muted-foreground">
                      Lex Judis Law Associates was founded with a vision to
                      deliver reliable, result-oriented legal solutions.
                    </p>
                  </div>
                  <div className="md:pl-16"></div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-secondary border-4 border-background"></div>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right md:order-1 order-2"></div>
                  <div className="md:pl-16 order-1 md:order-2">
                    <h3 className="text-xl font-bold mb-2">2010</h3>
                    <p className="text-muted-foreground">
                      Expanded our practice areas to include corporate advisory
                      and compliance services.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-secondary border-4 border-background"></div>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right">
                    <h3 className="text-xl font-bold mb-2">2015</h3>
                    <p className="text-muted-foreground">
                      Established comprehensive dispute resolution and
                      litigation services for businesses and individuals.
                    </p>
                  </div>
                  <div className="md:pl-16"></div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-secondary border-4 border-background"></div>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right md:order-1 order-2"></div>
                  <div className="md:pl-16 order-1 md:order-2">
                    <h3 className="text-xl font-bold mb-2">2020</h3>
                    <p className="text-muted-foreground">
                      Strengthened our position as a trusted legal ally for both
                      individuals and corporations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-6 h-6 rounded-full bg-secondary border-4 border-background"></div>
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right">
                    <h3 className="text-xl font-bold mb-2">Today</h3>
                    <p className="text-muted-foreground">
                      Continue to provide end-to-end legal services with the
                      highest standards of professionalism and integrity.
                    </p>
                  </div>
                  <div className="md:pl-16"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
