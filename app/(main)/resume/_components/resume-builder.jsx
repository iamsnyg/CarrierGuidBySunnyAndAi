"use client";   

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DownloadCloud, Save } from 'lucide-react'
// import { Download } from 'lucide-react'
import React, { useState } from 'react'

function ResumeBuilder({ initialContent }) {

    const [activeTab, setActiveTab] = useState('edit');
    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center  gap-2">
                <h1 className="text-5xl md:text-6xl font-bold gradient-title">
                    Resume Building
                </h1>
                <div className="space-x-2">
                    <Button className="mt-4 bg-purple-700 text-white hover:bg-purple-500 transition-colors">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                    </Button>
                    <Button variant="outline" className="mt-4">
                        <DownloadCloud className="h-4 w-4 mr-2" />
                        Download Pdf
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="edit">Form</TabsTrigger>
                    <TabsTrigger value="preview">Markdown</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                    Make changes to your account here.
                </TabsContent>
                <TabsContent value="preview">
                    Change your password here.
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default ResumeBuilder