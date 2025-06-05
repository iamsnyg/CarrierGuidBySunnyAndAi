import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";


export const checkUser = async () => {
    const user = await currentUser();
    // console.log("Current user:", user);
    if (!user) {
        return null;
    }
    // console.log("--------------------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    // try {
    const loggedInUser = await db.user.findUnique({
        where: {
            clerkUserId: user.id,
        },
        });
    
    console.log("Logged in user:", loggedInUser);
    console.log("==========================================================")

    if (loggedInUser) {
        return loggedInUser;
        console.log("User already exists in the database.");
    }

        const name = `${user.firstName} ${user.lastName}`.trim() || user.fullName || "Anonymous";
        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name: name,
                email: user.emailAddresses[0]?.emailAddress || "",
                image: user.imageUrl || "",
                username: user.username || `user-${user.id.slice(0, 6)}`, // Fallback username
            },
        });
    // } catch (error) {
    //     console.error("Error checking user:", error);
    //     throw new Error("Failed to check user authentication");
    // }
}