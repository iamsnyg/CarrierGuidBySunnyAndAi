"use client";

import { generateTechnicalQuiz } from '@/actions/interview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useFetch from '@/hooks/use-fetch';
import React, { useState }  from 'react'


function QuizPage() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);

    const {
        loading: generatingQuiz,
        data: quizData,
        fn:generateQuizFn
    } = useFetch(generateTechnicalQuiz)

    if (!quizData) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Ready to test your knowledge? </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        The Quiz Contains 10 questions, each with 4 options. Specify to your industry and skills to get the most relevant questions.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button >Start Quiz...</Button>
                </CardFooter>
            </Card>
        )
    }
    return (
        <div>QuizPage</div>
    )
}

export default QuizPage