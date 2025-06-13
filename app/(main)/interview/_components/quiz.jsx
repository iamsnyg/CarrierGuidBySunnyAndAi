"use client";

import { generateTechnicalQuiz, saveQuizResult } from '@/actions/interview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect, useState }  from 'react'
import { BarLoader, HashLoader, PulseLoader } from 'react-spinners';
import { toast } from 'sonner';
import QuizResult from './quiz-result';
// import { ca } from 'zod/dist/types/v4/locales';


function QuizPage() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);

    const {
        loading: generatingQuiz,
        data: quizData,
        fn:generateQuizFn
    } = useFetch(generateTechnicalQuiz)

    const {
        loading: savingResult,
        data: resultData,
        fn: saveQuizResultFn,
        setData: setResultData
    } = useFetch(saveQuizResult);

    console.log("resultData=>", resultData);

    useEffect(() => {
        if (quizData) {
            setAnswers(new Array(quizData.length).fill(null));
        }
    }, [quizData]);

    const handleAnswer = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    }

    const handleNextQuestion = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setShowExplanation(false);
        } else {
            finishQuiz();
        }
    }

    const calculateScore = () => { 
        let correct = 0;
        answers.forEach((answer, index) => {
            if (answer === quizData[index].correctAnswer) {
                correct++;
            }
        });
        return (correct / quizData.length) * 100;
    }
    const finishQuiz = async () => { 
        const score = calculateScore();

        try {
            await saveQuizResultFn(quizData, answers, score);
            toast.success("Quiz results saved successfully!");
        } catch (error) {
            toast.error(error.message || "Failed to save quiz results. Please try again.");
        }
    }

    const startNewQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        generateQuizFn();
        setResultData(null);
    }

    if (generatingQuiz) { 
        return <PulseLoader className='mt-4' width={100} color='purple' />
    }

    if (resultData) {
        return (
            <div className="mx-2">
                <QuizResult result={resultData} onStartNew={startNewQuiz} />
            </div>
        )
    }

    if (!quizData) {
        return (
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Ready to test your knowledge? </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-muted-foreground'>
                        The Quiz Contains 10 questions, each with 4 options. Specify to your industry and skills to get the most relevant questions.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={generateQuizFn}>Start Quiz...</Button>
                </CardFooter>
            </Card>
        )
    }

    const question = quizData[currentQuestion];
    return (
        <Card className="mx-2">
            <CardHeader>
                <CardTitle>
                    Question {currentQuestion + 1} of {quizData.length} :
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-lg font-medium mb-4'>{question.question}</p>

                <RadioGroup
                    defaultValue="option-one"
                    className="space-y-2"
                    value={answers[currentQuestion]}
                    onValueChange={handleAnswer}
                    >
                    {question.options.map((option, index) => {
                        return (
                            <div className="flex items-center space-x-2" key={index}>
                                <RadioGroupItem value={option} id={`option-${index}`} />
                                <Label htmlFor={`option-${index}`}>{option}</Label>
                            </div>
                        )
                    } )}
                </RadioGroup>    

                {showExplanation && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h3 className="font-medium">Explanation:</h3>
                        <p className='text-lg text-muted-foreground'>{question.explanation}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
            {!showExplanation && (
                    <Button
                        variant="outline"
                        onClick={() => {
                            setShowExplanation(true);
                        }}
                        disabled={!answers[currentQuestion]}
                    >
                        Show Explanation
                    </Button>
                )}

                <Button
                className="ml-auto"
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestion] || savingResult}
                >
                    {savingResult && (<HashLoader className='mt-4' width={20} color='purple' />)}
                    {currentQuestion < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
            </CardFooter>
            
        </Card>
    )
}

export default QuizPage