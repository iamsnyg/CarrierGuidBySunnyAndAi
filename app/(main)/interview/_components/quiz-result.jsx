import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Trophy, XCircle } from 'lucide-react';
import React from 'react'

function QuizResult({ result, hideStartNew, onStartNew }) {
    if (!result) {
        return <div className="text-center">No results available</div>;
    }
    return (
        <div>
            <h1 className='flex items-center gap-2 text-3xl gradient-title'>
                <Trophy className=" h-6 w-6 mr-2 text-yellow-500" />
                    Quiz Result
            </h1>

            <CardContent className='space-y-6'>
                {/* Quiz Score */}
                <div className='text-center space-y-4'>
                    <h3 className="text-2xl font-bold">
                        {result.quizScore.toFixed(1)}%
                    </h3>
                    <Progress value={result.quizScore}  className="w-full"/>
                </div>

                {/* Improvement Tips */}
                {
                    result.improvementTips && (
                        <div className='bg-muted p-4 rounded-lg mt-6'>
                            <p className='font-bold'>Improvement Tips</p>
                            <p className='text-muted-foreground'>{result.improvementTips}</p>
                        </div>
                    )
                }


                {/* Questions Review */}
                <div>
                    <h3 className='text-2xl font-bold mt-6'>Questions Review</h3>
                    {result.questions.map((q, index) => (
                        <div className='border rounded-lg p-4 space-y-2' key={index}>
                            <div className='flex items-center justify-between gap-2'>
                                <p className='font-medium'>{q.question}</p>
                                {q.isCorrect ? (
                                    <CheckCircle2 className='h-5 w-5 text-green-500 flex-shrink-0' />
                                ) : (
                                    <XCircle className='h-5 w-5 text-red-500 flex-shrink-0' />
                                )}
                            </div>

                            <div className='text-sm text-muted-foreground'>
                                <p>Your Answer: {q.userAnswer}</p>
                                {!q.isCorrect &&  <p>Correct Answer: {q.answer}</p>}
                            </div>

                            <div className='text-sm bg-muted p-2 rounded'>
                                <p className='font-medium'>Explanation: </p>
                                <p>{q.explanation}</p>

                            </div>
                        </div>
                    ))}
                        
                </div>
            </CardContent>
            {!hideStartNew && (
                <div className='text-center mt-6'>
                    <Button
                        onClick={onStartNew}
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                    >
                        Start New Quiz
                    </Button>
                </div>
            )}
        </div>
    )
}

export default QuizResult