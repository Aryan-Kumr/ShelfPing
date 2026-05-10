import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";


const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  connectionLimit: 5,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "shelfping",
})

const globalForPrisma = global as unknown as { prisma: PrismaClient};

export const prisma = globalForPrisma.prisma || new PrismaClient({adapter});

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
