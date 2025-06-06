import { industries } from '@/app/data/industries'
import React from 'react'

function OnboardingPage() {
  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  )
}

export default OnboardingPage