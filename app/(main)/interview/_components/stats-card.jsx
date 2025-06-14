import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain,  Trophy } from 'lucide-react';
import React from 'react'

function StatsCard({ assessments }) {
    
    const getAverageScore = () => { 
        if (!assessments || assessments.length === 0) return 0;
        const totalScore = assessments.reduce((sum, assessment) => sum + assessment.quizScore, 0);
        return (totalScore / assessments.length).toFixed(1);
    }

    const getLatestAssessment = () => { 
        if (!assessments?.length) return null;
        return assessments[0];
        
    }

    const getLatestDate = () => {
        if (!assessments?.length) return 'N/A';
        const latestAssessment = assessments.reduce((latest, assessment) => {
            const assessmentDate = new Date(assessment.createdAt);
            if (latest === null) return assessmentDate; // First iteration
            return assessmentDate > latest ? assessmentDate : latest;
            // return assessmentDate > latest ? assessment : latest;
        }, new Date(0)); // Start with the earliest possible date
        return latestAssessment.toLocaleDateString();
    }

    const getTotalQuestions = () => {
        if (!assessments?.length) return 0;
        return assessments.reduce((sum, assessment) => sum + assessment.questions.length, 0);
    }

  return (
    <div className='grid  md:grid-cols-3 gap-4 '>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex flex-col ">
                    <CardTitle className="mb-2">Average Score</CardTitle>
                </div>
                <div className="">
                    <Trophy className={`h-4 w-4 text-yellow-500 text-muted-foreground`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    {getAverageScore()}%
                </div>
                <p className="text-sm text-muted-foreground">Across all assessments</p>
            </CardContent>
        </Card>
          
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex flex-col ">
                    <CardTitle className="mb-2">Question Practice</CardTitle>
                </div>
                <div className="">
                    <Brain className={`h-4 w-4 text-red-400 text-muted-foreground`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    {getTotalQuestions()}
                </div>
                <p className="text-sm text-muted-foreground">Total Questions</p>
            </CardContent>
        </Card>


        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex flex-col ">
                    <CardTitle className="mb-2">Latest Score</CardTitle>
                </div>
                <div className="">
                    <Trophy className={`h-4 w-4 text-yellow-500 text-muted-foreground`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    {getLatestAssessment() ? getLatestAssessment().quizScore.toFixed(1) : 'N/A'}%
                </div>
                  <p className="text-sm text-muted-foreground">Most Recent Quiz</p>
                  <p className="text-sm text-muted-foreground">Date: {getLatestDate()}</p>
            </CardContent>
        </Card>
    </div>
  )
}

export default StatsCard