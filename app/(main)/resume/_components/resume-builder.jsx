"use client";   

import { saveResume } from '@/actions/resume';
import { resumeSchema } from '@/app/lib/schema';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/use-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, DownloadCloud, Edit, Monitor, Save } from 'lucide-react'
// import { Download } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import EntryForm from './entry-form';
import { entriesToMarkdown } from '@/app/lib/helper';
import MDEditor from '@uiw/react-md-editor';
import { useUser } from '@clerk/nextjs';

function ResumeBuilder({ initialContent }) {

    const [activeTab, setActiveTab] = useState('edit');
    const [resumeMode, setResumeMode] = useState('preview'); // 'markdown' or 'html'
    const [previewContent, setPreviewContent] = useState(initialContent);
    const {user} = useUser();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            contactInfo: {},
            summary: "",
            skills: "",
            education: [],
            experience: [],
            projects: [],
        }
    })

    const {
        data: saveResult,
        loading: isSaving,
        error: saveError,
        fn: saveResumeFn,
    } = useFetch( saveResume)


    const formValues = watch();

    useEffect(() => {
        if (initialContent) {
            setActiveTab('preview');
        }
    }, [initialContent]);

    useEffect(() => { 
        if (activeTab === 'edit') {
            const newContent = getCombinedContent();
            setPreviewContent(newContent ? newContent : initialContent)
        }
    }, [formValues, activeTab]);


    const getContactMarkdown = () => { 
        const { contactInfo } = formValues;
        const parts = [];
        if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
        if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
        if (contactInfo.linkedin)
        parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
        if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

        return parts.length > 0
        ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
        : "";
    }


    const getCombinedContent = () => { 
        const { summary, skills, experience, education, projects } = formValues;
        
        return [
            getContactMarkdown(),
            summary && `## Professional Summary\n\n${summary}`,
            skills && `## Skills\n\n${skills}`,
            entriesToMarkdown(experience, "Work Experience"),
            entriesToMarkdown(education, "Education"),
            entriesToMarkdown(projects, "Projects"),
        ].filter(Boolean)
        .join("\n\n");
    }

    const onSubmit = async (data)=>{}

    
    return (
        <div className="space-y-4" suppressHydrationWarning="true">
            <div className="flex flex-col md:flex-row justify-between items-center  gap-2">
                <h1 className="text-5xl md:text-6xl font-bold gradient-title">
                    Resume Building
                </h1>
                <div className="space-x-2">
                    <div>
                        <Button className="mt-4 bg-purple-700 text-white hover:bg-purple-500 transition-colors">
                            <Save className="h-4 w-4 mr-2" />
                            Save
                        </Button>
                    </div>
                    <div>
                        <Button variant="outline" className="mt-4">
                            <DownloadCloud className="h-4 w-4 mr-2" />
                            Download Pdf
                        </Button>
                    </div>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="edit">Form</TabsTrigger>
                    <TabsTrigger value="preview">Markdown</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                    <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-4'>
                            <h3 className='text-lg font-medium'>Contact Information</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50 '>
                                <div className='space-y-2'>
                                    <label className='text-sm font-medium'>Email</label>
                                    <Input
                                        {...register("contactInfo.email")}
                                        placeholder="your@email.com"
                                        type="email"
                                        error={errors.contactInfo?.email}
                                    />
                                    <div>{errors.contactInfo?.email && (
                                        <p className="text-red-500 text-sm">
                                            {errors.contactInfo.email.message}
                                        </p>
                                    )}</div>
                                </div>


                                <div className='space-y-2'>
                                    <label className='text-sm font-medium'>Mobile</label>
                                    <Input
                                        {...register("contactInfo.mobile")}
                                        placeholder="+123-456-7890"
                                        type="tel"
                                        error={errors.contactInfo?.mobile}
                                    />
                                    <div>{errors.contactInfo?.mobile && (
                                        <p className="text-red-500 text-sm">
                                            {errors.contactInfo.mobile.message}
                                        </p>
                                    )}</div>
                                </div>


                                <div className='space-y-2'>
                                    <label className='text-sm font-medium'>LinkedIn URL</label>
                                    <Input
                                        {...register("contactInfo.linkedin")}
                                        placeholder="https://www.linkedin.com/in/your-profile"
                                        type="url"
                                        error={errors.contactInfo?.linkedin}
                                    />
                                    <div>{errors.contactInfo?.linkedin && (
                                        <p className="text-red-500 text-sm">
                                            {errors.contactInfo.linkedin.message}
                                        </p>
                                    )}</div>
                                </div>


                                <div className='space-y-2'>
                                    <label className='text-sm font-medium'>GitHub URL</label>
                                    <Input
                                        {...register("contactInfo.github")}
                                        placeholder="https://github.com/your-profile"
                                        type="url"
                                        error={errors.contactInfo?.github}
                                    />
                                    <div>{errors.contactInfo?.github && (
                                        <p className="text-red-500 text-sm">
                                            {errors.contactInfo.github.message}
                                        </p>
                                    )}</div>
                                </div>
                            </div>
                        </div>


                        <div className='space-y-2'>
                            <h3 className='text-lg font-medium'>Professional Summary</h3>
                            <Controller
                                name="summary"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        placeholder="Write a brief summary about yourself"
                                        className="h-32"
                                        error={errors.summary}
                                    />
                                )}
                            />
                            <div>
                                {errors.summary && (
                                <p className="text-red-500 text-sm">
                                    {errors.summary.message}
                                </p>
                                )}
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <h3 className='text-lg font-medium'>Skills</h3>
                            <Controller
                                name="skills"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        placeholder="List your skills, separated by commas"
                                        className="h-32"
                                        error={errors.skills}
                                    />
                                )}
                            />
                            <div>
                                {errors.skills && (
                                <p className="text-red-500 text-sm">
                                    {errors.skills.message}
                                </p>
                                )}
                            </div>
                        </div>        
                        
                        <div className='space-y-2'>
                            <h3 className='text-lg font-medium'>Work Experience</h3>
                            <Controller
                                name="experience"
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type="Experience"
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <div>
                                {errors.experience && (
                                <p className="text-red-500 text-sm">
                                    {errors.experience.message}
                                </p>
                                )}
                            </div>
                        </div>          
                        
                        <div className='space-y-2'>
                            <h3 className='text-lg font-medium'>Education</h3>
                            <Controller
                                name="education"
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type="Education"
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <div>
                                {errors.education && (
                                <p className="text-red-500 text-sm">
                                    {errors.education.message}
                                </p>
                                )}
                            </div>
                        </div>                 

                        
                        <div className='space-y-2'>
                            <h3 className='text-lg font-medium'>Projects</h3>
                            <Controller
                                name="projects"
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type="Projects"
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <div>
                                {errors.projects && (
                                <p className="text-red-500 text-sm">
                                    {errors.projects.message}
                                </p>
                                )}
                            </div>
                        </div>
                    </form>
                </TabsContent>
                <TabsContent value="preview">
                    
                    <Button variant="link" type="button" className="mb-2" onClick={() => setResumeMode(resumeMode === "preview" ? "edit" : "preview")}>
                        {resumeMode === 'preview' ? (
                            <>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Markdown
                            </>
                        ) : (
                                <>
                                    <Monitor className="h-4 w-4 mr-2" />
                                    Show Preview 
                                </>
                        )}
                    </Button>


                    {resumeMode !== 'preview' && (
                        <div className="p-4 bg-yellow-200/5 border border-yellow-200 text-yellow-600 rounded-lg mb-4 flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5" />
                            <span className="text-sm font-semibold">you will lose edited markdown if you switch to preview</span>
                        </div>
                    )}
                    

                    <div className='border rounded-lg'>
                        <MDEditor value={previewContent} onChange={setPreviewContent} height={800} preview={resumeMode} />

                    </div>
                    
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default ResumeBuilder