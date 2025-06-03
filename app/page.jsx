// import HeroSection from "@/components/HeroSection";
import HeroSection from "@/components/hero";
import Image from "next/image";
import { features } from "./data/features";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>
      <HeroSection />

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tighter mb-12">
            Powerful features to help your career growth.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              return (
                <Card key={index} className="border-2 hover:border-x-purple-400 transition-all duration-300 ease-in-out">
                  {/* Card content */}
                  <CardContent className="flex flex-col justify-center items-center space-y-4 pt-5">
                    {feature.icon}
                    <h3 className="underline text-center text-xl">{feature.title}</h3>
                    <p className="text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
