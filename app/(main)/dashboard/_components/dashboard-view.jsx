"use client"

import { BrainCircuit, Briefcase, BriefcaseIcon, LineChart, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react'
import { format, formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Label } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRange.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case 'positive':
        return { icon: TrendingUp, color: 'text-green-500' };
      case 'neutral':
        return { icon: LineChart, color: 'text-yellow-500' };
      case 'negative':
        return { icon: TrendingDown, color: 'text-red-500' };
      default:
        return { icon: LineChart, color: 'text-gray-500' };
    }
      
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), 'dd/MM/yyyy');
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate), 
    { addSuffix: true }
  )

  

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <Badge variant="outline">Last Updated: {lastUpdatedDate}</Badge>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      <Card >
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Market Outlook</CardTitle>
            <OutlookIcon className={`h-4 w-4 text-purple-600` } />
        </CardHeader>
        <CardContent>
            <div className={`${outlookColor} text-xl font-bold`}>{insights.marketOutlook}</div>
            <p className='text-sm text-muted-foreground'>Next Update: {nextUpdateDistance}</p>
        </CardContent>
        </Card>
        

        <Card >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Industry Growth</CardTitle>
              <OutlookIcon className={`h-4 w-4 text-purple-600` } />
          </CardHeader>
          <CardContent>
              <div className={`${outlookColor} text-xl font-bold`}>{insights.growthRate.toFixed(2)}%</div>
              <Progress className='mt-2' color='primary' value={insights.growthRate} />
          </CardContent>
        </Card>


        <Card >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Demand Level</CardTitle>
              <BriefcaseIcon className={`h-4 w-4 text-purple-600` } />
          </CardHeader>
          <CardContent>
              {/* <div className={`${outlookColor} text-xl font-bold`}>{insights.demandLevel}</div> */}
            <div
              className={`h-2 rounded-md ${getDemandLevelColor(insights.demandLevel)}`}
              style={{ width: `${insights.demandLevel}%` }} 
            /> 

            

          </CardContent>
        </Card>
        

        <Card >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Top Skills</CardTitle>
              <BrainCircuit className={`h-4 w-4 text-purple-600` } />
          </CardHeader>
          <CardContent>
            <div className='flex flex-wrap'>
              {insights.topSkills.map((skill, index) => (
                <Badge key={index} className='mr-2 mb-2' variant="secondary">
                  {skill}
                </Badge>
              ))}
              </div>
          </CardContent>
        </Card>
        


      </div>
    </div>
  )
}

export default DashboardView