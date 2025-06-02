"use client"

import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

function HeroSection() {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;


    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThresold = 100; // Adjust this value as needed

      if(scrollPosition > scrollThresold) {
        imageElement.classList.add("scrolled");
      }else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
        <div className='container mx-auto px-4 flex flex-col items-center justify-center space-y-8 text-center'>
            <div className='space-y-4 mx-auto max-w-2xl'>
                <h1 className=' gradient-title text-5xl md:text-6xl font-bold tracking-tight'>
                    Your Ai Coach for
                    <br />
                    Success and Growth
                </h1>
                <p className='mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground'>
                    Unlock your potential with personalized AI-driven career guidance. 
                    <br />
                    Our AI-powered platform helps you navigate the job market, 
                    <br />
                    find your dream role, and achieve your career goals.
                </p>                
            </div>

            <div className='flex justify-center space-x-4'>
              <Link href="/dashboard">
                <Button size='lg'  >Get Started</Button>
              </Link>

            </div>

            <div className='hero-image-wrapper mt-5 md:mt-0'>
              <div ref={imageRef} className='hero-image'>
                <Image 
                src={"/banner2.jpg"}
                alt="Hero Image"
                width={1280}
                height={750}
                className="rounded-lg shadow-2xl border mx-auto"
                priority 
                />
              </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection