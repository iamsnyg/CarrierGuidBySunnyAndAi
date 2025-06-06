// import { currentUser } from "@clerk/nextjs/server"
// import { db } from "./prisma";


// export const checkUser = async () => {
//     const user = await currentUser();
//     console.log("Current user:", user);
//     if (!user) {
//         return null;
//     }

//     // try {
//     const loggedInUser = await db.user.findUnique({
//         where: {
//             clerkUserId: user.id,
//         },
//         });
    
//     console.log("Logged in user:", loggedInUser);

//     if (loggedInUser) {
//         console.log("User already exists in the database.");
//         return loggedInUser;
//     }

//     const name = `${user.firstName} ${user.lastName}`.trim() ||  "Anonymous";
//     const newUser = await db.user.create({
//         data: {
//             clerkUserId: user.id,
//             name: name,
//             email: user.emailAddresses[0]?.emailAddress || "",
//             image: user.imageUrl || "",
//             username: user.username || `user-${user.id.slice(0, 6)}`, // Fallback username
//         },

//     });
//     console.log("New user created:", newUser);
//     return newUser;
    
    
//     // } catch (error) {
//     //     console.error("Error checking user:", error);
//     //     throw new Error("Failed to check user authentication");
//     // }
// }



import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
    const user = await currentUser();
    // console.log("Current user:", user);

  if (!user) {
    return null;
    }

    // console.log("db.user.findUnique called with clerkUserId:", user.id);

  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  if (loggedInUser) {
    return loggedInUser;
  }

  // console.log("Creating new user in the database...");
  const name = `${user.firstName} ${user.lastName}`.trim() || "Anonymous";

  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name,
      email: user.emailAddresses[0]?.emailAddress || "",
      username: user.username || "",
      imageUrl: user.imageUrl || "",
    },
  });
  return newUser;
};