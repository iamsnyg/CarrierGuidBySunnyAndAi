"use client";

import { improveWithAI } from '@/actions/resume';
import { entrySchema } from '@/app/lib/schema'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/use-fetch';
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parse } from 'date-fns';
import { Loader2, PlusCircle, Sparkles, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';


const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = parse(dateString, 'yyyy-MM', new Date());
    return format(date, 'MMM yyyy');
}

function EntryForm({ type, entries, onChange }) {

    const [isAdding, setIsAdding] = useState(false)
    
    const { 
        register,
        handleSubmit: handleValidation,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        resolver: zodResolver(entrySchema),
        defaultValues: {
            title: '',
            organization: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        }
    })

    const current= watch("current");

    const {
        loading: isImproving,
        data: improvedContent,
        fn: improveWithAIFn,
        error: improveError,
    } = useFetch(improveWithAI)

    const handleAdd = handleValidation(async (data) => {
        const formattedEntry = {
            ...data,
            startDate: formatDisplayDate(data.startDate),
            endDate: data.current ? '' : formatDisplayDate(data.endDate),
        }

        onChange([...entries, formattedEntry]);
        reset();
        setIsAdding(false);
    })
    const handleDelete = (index) => {
        onChange(entries.filter((_, i) => i !== index));
    }

    useEffect(() => {
        if (improvedContent && !isImproving) {
            setValue("description", improvedContent);
            toast.success("Description improved successfully!");
        }

        if (improveError) {
            toast.error(improveError.message || "Failed to improve description.");
        }
    },[improvedContent, improveError, isImproving])

    const handleImproveDescription = async() => {
        const description = watch("description");
        if (!description) {
            toast.error("Description is empty. Please add a description before improving it.");
            return;
        }
        const improved = await improveWithAIFn({
            current: description,
            type: type.toLowerCase(),
        });
        setValue("description", improved);
    }

    return (
        <div className='space-y-4'>
            <div className='space-y-2'>
                {entries.map((entry, index) => {
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{entry.title} @ {entry.organization}</CardTitle>
                                <Button
                                    variant="outline"
                                    size="icon"    
                                    onClick={() => handleDelete(index)}
                                >
                                    <X className='h-4 w-4 text-red-500' />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <p className='text-sm text-muted-foreground'>
                                    {entry.current ? `${entry.startDate} - Present` : `${entry.startDate} - ${entry.endDate}`}
                                </p>
                                <p className='text-sm mt-2 whitespace-pre-wrap'>
                                    {entry.description || "No description provided."}
                                </p>
                                
                            </CardContent>
                        </Card>
                    );  
                })}
            </div>
            {isAdding && (
                <Card>
                    <CardHeader>
                        <CardTitle>Add {type}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Input
                                    {...register("title")}
                                    placeholder="Title/Position"
                                    error={errors.title}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Input
                                    {...register("organization")}
                                    placeholder="Organization/Company"
                                    error={errors.organization}
                                />
                                {errors.organization && (
                                    <p className="text-red-500 text-sm">
                                        {errors.organization.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Input
                                    {...register("startDate")}
                                    type="month"
                                    error={errors.startDate}
                                />
                                <div>
                                    {errors.startDate && (
                                        <p className="text-red-500 text-sm">
                                            {errors.startDate.message}
                                        </p>
                                    )}
                                </div>
                            </div>


                            <div className="space-y-2">
                                <Input
                                    {...register("endDate")}
                                    type="month"
                                    disabled={current}
                                    error={errors.endDate}
                                />
                                <div>
                                    {errors.endDate && (
                                        <p className="text-red-500 text-sm">
                                            {errors.endDate.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id='current'
                                {...register("current")}
                                onChange={(e) => { 
                                    setValue("current", e.target.checked);
                                    if (e.target.checked) {
                                        setValue("endDate", ""); // Clear end date if current
                                    }
                                }}
                            />
                            <div>
                                <label htmlFor='current'>Currently {type}</label>
                            </div>
                        </div>


                        <div className="space-y-2">
                            <Textarea
                                placeholder={`Description of your ${type.toLowerCase()}`}
                                {...register("description")}
                                error={errors.description}
                                className="h-32"
                            />
                            <div>
                                {errors.description && (
                                    <p className="text-red-500 text-sm">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={handleImproveDescription}
                            disabled={isImproving || !watch("description")}
                        >
                            {isImproving ? (
                                <div>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Improving...
                                </ div>
                            ) : (
                                <div>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Improve with AI
                                </ div>
                            )}
                        </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                        <div className="flex justify-end space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    reset();
                                    setIsAdding(false);
                                }}
                            >Cancel</Button>
                            <Button type="button" className="bg-purple-600 text-white hover:bg-purple-500" onClick={handleAdd}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Entry
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}

            {!isAdding && (
                <div>
                    <Button
                    className="bg-purple-600 text-white hover:bg-purple-500"
                    onClick={() => setIsAdding(true)}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add {type}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default EntryForm