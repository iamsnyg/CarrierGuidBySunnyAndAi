import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'

async function IndustryInsightsPage() {
  const { isOnboarded } = await getUserOnboardingStatus();
  
    if (!isOnboarded) { 
      redirect('/onboarding');
    }
  return (
    <div>IndustryInsightsPage</div>
  )
}

export default IndustryInsightsPage