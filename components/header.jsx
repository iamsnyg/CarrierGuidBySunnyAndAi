import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
// import { Header } from '@radix-ui/react-accordion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { ChevronDown, FileText, LayoutDashboard, StarIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'


function header() {
  return (
    <header className='fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-f]:bg-background/80'>
      <nav className='container mx-auto px-4 pt-12 h-12 flex items-center justify-between'>
        <Link href="/" >
          <Image src="/logo.png" alt="Logo" width={60} height={60}
          className='h-32 py-4 w-auto object-contain'
          />
        </Link>

        <div className='flex items-center space-x-4 md:space-x-4'>
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button>
                <LayoutDashboard className='mr-2 h-4 w-4' />
                <span className='hidden md:block'>Dashboard</span>
              </Button>
            </Link>
          </SignedIn>

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
                <Link href={"/ai-career-guide"}>
                  <FileText className='h-4 w-4' />
                  <span className=''>Build Resume</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </nav>
        <SignedOut>
            <SignInButton />
            <SignUpButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
    </header>
  )
}

export default header