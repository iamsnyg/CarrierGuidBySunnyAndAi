import { getResume } from '@/actions/resume'
import React from 'react'
import ResumeBuilder from './_components/resume-builder';

async function ResumePage() {


    const resume = await getResume();
    return (
        <div className="container mx-auto space-y-6 py-6">
            <ResumeBuilder initialContent={resume?.content} />
        </div>
    )
}

export default ResumePage