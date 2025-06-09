"use client"

import React, { useEffect, useState } from 'react'
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
import useFetch from '@/hooks/use-fetch'
import { updateUser } from '@/actions/user'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const OnboardingForm = ({ industries }) => {
    const [selectIndustry, setSelectIndustry] = useState(null)
    const router = useRouter()
    const { 
        data: updateResult,
        loading: updateLoading,
        fn: updateUserFn
    } = useFetch(updateUser);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(onboardingSchema),

    })

    const onSubmit = async (values) => {
        try {
            const formattedIndustry = `${values.industry} - ${values.subIndustry
                .toLowerCase()
                .replace(/ /g, '-')
                }`;
            
            await updateUserFn({
                ...values,
                industry: formattedIndustry,
            })
        } catch (error) {
            console.error('Error updating user:', error)
        }
    }

    useEffect(() => {
        if (updateResult?.success && !updateLoading) {
            toast.success('Profile updated successfully!');
            router.push('/dashboard');
            router.refresh();
        }
    }, [updateResult, updateLoading])

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
                            value={watch('industry')}
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
                            value={watch('subIndustry')}
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
                        <p className='text-sm text-muted-foreground'>Separate skills with a comma(,)</p>
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
                    <div>
                        <Button type="submit" disabled={updateLoading} className='w-full bg-purple-500 hover:border hover:border-purple-500'>
                            {updateLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Updating...
                                </> 
                            ) : (
                                'Update Profile'
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
            
        </Card>
    </div>
)
}

export default OnboardingForm