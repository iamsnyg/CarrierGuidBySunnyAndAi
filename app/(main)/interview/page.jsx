import { getAssessment } from '@/actions/interview'
import React from 'react'
import StatsCard from './_components/stats-card';
import QuizList from './_components/quiz-list';
import PerformanceCard from './_components/performance-chart';

async function InterviewPrepPage() {
  const assessments = await getAssessment();
  // console.log('assessments', assessments);
  return (
    <div>
        <h1 className="text-6xl font-bold gradient-title">Interview Preparation</h1>
        <p className="text-muted-foreground">
          Prepare for your next interview with our comprehensive resources
        </p>

      <div>
        <StatsCard assessments={assessments} />
        <PerformanceCard assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>

      </div>
  )
}

export default InterviewPrepPage