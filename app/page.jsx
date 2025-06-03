// import HeroSection from "@/components/HeroSection";
import HeroSection from "@/components/hero";
import Image from "next/image";
import { features } from "./data/features";
import { Card, CardContent } from "@/components/ui/card";
import { testimonial } from "./data/testimonial";
import { faqs } from "./data/faqs";
// import { Accordion } from "@radix-ui/react-accordion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
                    <h3 className="underline text-center font-bold mb-2">{feature.title}</h3>
                    <p className="text-center text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>



      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tighter mb-12">
            What our users say about us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 max-w-8xl mx-auto">
            {testimonial.map((testimonial, index) => {
              return (
                <Card key={index} className="bg-background">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center space-x-4 ">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image src={testimonial.image}
                            alt={testimonial.author}
                            width={50} 
                            height={50} 
                            className="rounded-full object-cover border-2 border-purple-400"
                          />
                        </div>
                        <div>
                          <p className="font-bold">{testimonial.author}</p>
                          <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                          <p className="text-primary text-sm">{testimonial.company}</p>
                        </div>
                      </div>
                      <blockquote className="text-center pt-4">
                        <p className="text-muted-foreground text-center text-lg italic relative">
                          <span className="text-3xl text-primary absolute -top-4 -left-1">&quot;</span>
                          {testimonial.quote}
                          <span className="text-3xl text-primary absolute -bottom-2 ">&quot;</span>
                        </p>
                      </blockquote>
                    </div>
                  </CardContent>
                  
                </Card>
              );
            })}
          </div>
        </div>
      </section>


      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center tracking-tighter mb-12">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground text-lg md:text-xl font-medium mb-8">
            Here are some common questions we receive from our users.
          </p>
          <div className="max-w-6xl mx-auto space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => {
                  return (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>


      <section className="w-full ">
        <div className="mx-auto py-24 bg-gradient-to-br from-purple-200/70 to-purple-400/ rounded-lg ">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl text-purple-300 font-bold text-center tracking-tighter mb-12 sm:text-4xl md:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary">
              Join thousands of professionals who have transformed their careers with CarrierGuideByAI.
              Sign up today and take the first step towards your dream job!
            </p>
            <Link href="/dashboard" passHref >
              <Button variant="default" size="lg" className="h-11 mt-5 animate-bounce">Get Started on your Journey <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
          </div>
        </section>
    </div>
  );
}
