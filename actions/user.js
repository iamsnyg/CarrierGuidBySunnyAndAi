"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsight } from "./dashboard";
// import { generateAIInsight } from "./dashboard";

export async function updateUser(data) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        }
    })

    if (!user) throw new Error("User not found");

    try {
        const result = await db.$transaction(
            async (tx) => {
                //find if industry exist
                let industryInsight = await tx.industryInsight.findUnique({
                    where: {
                        industry: data.industry,
                    }
                })
                //if industry does not exist, create it with default values- will replace it with ai later
                if (!industryInsight) {
                    const insight = await generateAIInsight(data.industry);
                    industryInsight = await db.industryInsight.create({
                        data: {
                            industry: data.industry,
                            ...insight, // Assuming insight is an object with the necessary fields
                            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                            
                        },
                    });
                }
                // update the user
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience.toString(), // convert to string
                        bio: data.bio,
                        skills: data.skills,
                    },
                });

                return {updatedUser, industryInsight};

                
            },
            {
                timeout: 10000, // 10 seconds timeout
            }
        )

        return {
            success: true,
            ...result,
        }
    } catch (error) {
        console.error("Error updating user:", error.message);
        throw new Error("Failed to update user");
        
    }

}


export async function getUserOnboardingStatus() {
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

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId,
            },
            select: {
                industry: true,
            }
        })
        return {
            isOnboarded: !!user?.industry, // returns true if industry is set
        };
    } catch (error) {
        console.error("Error fetching onboarding status:", error);
        throw new Error("Failed to fetch onboarding status");
        
    }

}