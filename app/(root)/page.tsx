import Hero from "@/components/hero";
import FeaturedServices from "@/components/featured-services";
import WhyChooseUs from "@/components/why-choose-us";
import RecentCases from "@/components/recent-cases";
import Testimonials from "@/components/testimonials";
import CallToAction from "@/components/call-to-action";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Justice Law | Premier Legal Services",
  description:
    "Expert legal representation for all your needs. Our experienced attorneys provide personalized service and exceptional results.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <FeaturedServices />
      <WhyChooseUs />
      {/* <RecentCases /> */}
      {/* <Testimonials /> */}
      <CallToAction />
    </main>
  );
}
