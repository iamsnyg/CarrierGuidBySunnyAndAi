import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function MockInterviewPage() {
  return (
    <div>
      <div className='flex flex-col space-x-2 px-2'>
        <Link href={"/interview"}>
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className='w-4 h-4' />
            Back to Interview Preparations...
          </Button>
        </Link>

        <div className='flex flex-col space-y-2'>
          <h2 className='text-4xl font-semibold gradient-title'>Mock Interview</h2>
          <p className='text-muted-foreground'>
            Get ready for your interview with our mock interview service.
          </p>
        </div>
      </div>

      <Quiz />
    </div>
  )
}

export default MockInterviewPage;