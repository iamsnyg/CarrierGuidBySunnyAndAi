

import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { checkUser } from '@/lib/clerkUser'


const Header = async () => {
  // await checkUser();
  await checkUser(); // Ensure user is checked on header load
  return (
    <header className='fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-f]:bg-background/80'>
      <nav className='container mx-auto px-4 pt-2 flex items-center justify-between'>
        <Link href="/" className='flex items-center space-x-2'>
          <Image src="/logo.png" alt="Logo" width={100} height={50}
            className='h-20  w-auto object-contain'
          />
        {/* <p>ABC</p> */}
        </Link>

        <div className='flex items-center space-x-4 md:space-x-4'>
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button variant="outline" >
                <LayoutDashboard className='mr-2 h-4 w-4' />
                <span className='hidden md:block'>Dashboard</span>
              </Button>
            </Link>
          

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                  <StarIcon className='mr-2 h-4 w-4' />
                  <span className='hidden md:block'>Growth Tools</span>
                  <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={"/resume"} className='flex items-center space-x-2'>
                  <FileText className='h-4 w-4' />
                  <span className=''>Build Resume</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Link href={"/ai-cover-letter"} className='flex items-center space-x-2'>
                  <PenBox className='h-4 w-4' />
                  <span className=''>Cover Letter</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
              <Link href={"/interview"} className='flex items-center space-x-2'>
                  <GraduationCap className='h-4 w-4' />
                  <span className=''>Interview Prep</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline" >
                Sign in
              </Button>
            </SignInButton>
              <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: 'h-8 w-8',
                  userButtonAvatar: 'h-8 w-8 rounded-full',
                  userButtonProfile: 'hidden',
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>

      </nav>
    </header>
  )
}

export default Header