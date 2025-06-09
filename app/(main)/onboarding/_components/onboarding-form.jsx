"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { onboardingSchema } from '@/app/lib/schema'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const OnboardingForm = ({ industries }) => {
    const [selectIndustry, setSelectIndustry] = useState(null)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(onboardingSchema),
    })

    const onSubmit = async (values) => {
        console.log('Form submitted:', values)
     }

    const watchIndustry = watch('industry')
return (
    <div className='flex items-center justify-center bg-background'>
        <Card className='w-full max-w-lg mt-10 mx-2'>
            <CardHeader>
                <CardTitle className="gradient-title text-4xl">Complete Your Profile</CardTitle>
                <CardDescription>Select Your industry to get personalized career insight and recommendations</CardDescription>
            </CardHeader>
            <CardContent>
                <form action="" className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-2'>
                        <Label htmlFor="industry" className="">Industry</Label>
                        <Select
                            onValueChange={(value) => {
                                setValue('industry', value);
                                setSelectIndustry(
                                    industries.find((industry) => industry.id === value)
                                ) 
                                setValue('subIndustry', '') 
                            }}
                        >
                            <SelectTrigger id="industry" >
                                <SelectValue placeholder="Select an industry" />
                            </SelectTrigger>
                            <SelectContent>
                                {industries.map((industry) => {
                                    return (
                                        <SelectItem key={industry.id} value={industry.id}>
                                        {industry.name}
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                        {errors.industry && <p className='text-red-500 text-sm'>{errors.industry.message}</p>}
                    </div>
                    {watchIndustry && (
                        <div className='space-y-2'>
                        <Label htmlFor="subIndustry" className="">Specialization</Label>
                        <Select
                            onValueChange={(value) => {
                                setValue('subIndustry', value);
                            }}
                        >
                            <SelectTrigger id="subIndustry" >
                                <SelectValue placeholder="Select a specialization" />
                            </SelectTrigger>
                            <SelectContent>
                                {selectIndustry?.subIndustries.map((industry) => {
                                    return (
                                        <SelectItem key={industry} value={industry}>
                                        {industry}
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                        {errors.subIndustry && <p className='text-red-500 text-sm'>{errors.subIndustry.message}</p>}
                        </div>
                    )}
                    <div className='space-y-2'>
                        <Label htmlFor="experience" className="">Year of Experience</Label>
                        <Input id="experience"
                            type="number"
                            placeholder="Enter your years of experience"
                            min="0"
                            max="50"
                            {...register('experience')}
                        />
                        {errors.experience && <p className='text-red-500 text-sm'>{errors.experience.message}</p>}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="skills" className="">Skills</Label>
                        <Input id="skills"
                            type="text"
                            placeholder="e.g. JavaScript, React, Node.js" 
                            {...register('skills')}
                        />
                        <p className='text-sm text-muted-foreground'>Seperate skills with a comma(,)</p>
                        {errors.skills && <p className='text-red-500 text-sm'>{errors.skills.message}</p>}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="bio" className="">Bio</Label>
                        <Textarea id="bio"
                            placeholder="Tell us about professional background..."
                            className='h-32'
                            {...register('bio')}
                        />
                        
                        {errors.bio && <p className='text-red-500 text-sm'>{errors.bio.message}</p>}
                    </div>
                    <Button type="submit" className='w-full bg-purple-500 hover:border hover:border-purple-500'>Submit</Button>
                </form>
            </CardContent>
            
        </Card>
    </div>
)
}

export default OnboardingForm