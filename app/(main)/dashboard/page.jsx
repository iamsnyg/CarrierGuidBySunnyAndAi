// import { getIndustryInsight } from '@/actions/dashboard';
import { getIndustryInsight } from '@/actions/dashboard';
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import React from 'react'
import DashboardView from './_components/dashboard-view';

async function IndustryInsightsPage() {
  const { isOnboarded } = await getUserOnboardingStatus();
  const insights = await getIndustryInsight();
  
    if (!isOnboarded) { 
      redirect('/onboarding');
    }
  return (
    <div className='mx-auto container'>
      <DashboardView insights={insights} />
      {/* <h1 className='text-2xl font-bold'>Industry Insights</h1> */}
    </div>
  )
}

export default IndustryInsightsPage