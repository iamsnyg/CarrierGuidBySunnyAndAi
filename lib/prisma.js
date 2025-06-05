// import { PrismaClient } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient()
// console.log("db====>>", db);

if(process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}

