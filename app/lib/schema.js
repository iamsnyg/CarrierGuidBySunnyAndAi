import { z } from "zod";

export const onboardingSchema = z.object({
    industry: z.string({
        required_error: "Please select an industry",
    }),
    subIndustry: z.string({
        required_error: "Please select a specialization",
    }),
    bio: z.string().max(500).optional(),
    experience: z.string().transform((val) => parseInt(val, 10)).pipe(
        z.number().min(0, "Experience must be at least 0 years").max(50, "Experience cannot exceed 50 years")
    ),
    skills: z.string().transform((val) =>
        val ? val.split(",").map((skill) => skill.trim()).filter(Boolean) : undefined
    ),
})

export const contactSchema = z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    linkedin: z.string().url("Invalid LinkedIn URL").optional(),
    github: z.string().url("Invalid GitHub URL").optional(),
});

export const entrySchema = z.object({
    title: z.string().min(1, "Title is required"),
    organization: z.string().min(1, "Organization is required"),
    startDate: z.date().min(1, "Start date is required"),
    endDate: z.date().optional(),
    description: z.string().min(1, "Description is required"),
    current: z.boolean().default(false),
}).refine((data) => {
    if (!data.current && !data.endDate) {
        return false;
    }
    return true;
},
{
    message: "End date is required unless this is your current position",
    path: ["endDate"],
    });


export const resumeSchema = z.object({
    contact: contactSchema,
    summary: z.string().min(1, "Professional summary is required"),
    skills: z.string().min(1, "Skills are required"),
    experiences: z.array(entrySchema),
    education: z.array(entrySchema),
    projects: z.array(entrySchema),
});