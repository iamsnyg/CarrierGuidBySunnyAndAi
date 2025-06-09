"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const generateAIInsight = async(industry) => {
    
}

export async function getIndustryInsight() {
    const { userId } = await auth();
    if (!userId) {
    throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });

    if (!user) throw new Error("User not found");

    if (!user.industryInsight) {
        const insight = await generateAIInsight(user.industry);

        const industryInsight = await db.industryInsight.create({
            data: {
                industry: user.industry,
                ...insight, // Assuming insight is an object with the necessary fields
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                
            },
        });

        return industryInsight;
    }
    return user.industryInsight;
}