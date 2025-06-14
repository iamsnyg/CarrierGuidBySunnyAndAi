"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import QuizResult from './quiz-result';

function QuizList({assessments}) {
    const router = useRouter();
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col ">
                        <CardTitle className="gradient-title text-2xl md:text-3xl ">
                            Recent Quizzes
                        </CardTitle>
                        <CardDescription>
                            Track your progress and performance
                        </CardDescription>
                    </div>
                    <Button onClick={() => router.push("/interview/mock")}>
                        Start New Quiz
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {assessments.map((assessment, index) => {
                            return (
                                <Card
                                    key={assessment.id}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors duration-200"
                                    onClick={() => setSelectedQuiz(assessment)}
                                >
                                    <CardHeader>
                                        <CardTitle>Quiz: {index + 1}</CardTitle>
                                        <CardDescription className="flex justify-between w-full">
                                            <div className="flex-1">
                                                score:{" "}
                                                {assessment.quizScore.toFixed(
                                                    1
                                                )}
                                                %
                                            </div>
                                            <div>
                                                {format(
                                                    new Date(
                                                        assessment.createdAt
                                                    ),
                                                    "MMM dd, yyyy HH:mm"
                                                )}
                                            </div>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            {assessment.improvementTips ||
                                                "No improvement tips available"}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
            <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                    </DialogHeader>
                    <QuizResult
                        result={selectedQuiz}
                        onStartNew={() => router.push("/interview/mock")}
                        hideStartNew
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default QuizList