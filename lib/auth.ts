import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { role } from "better-auth/client";



export const auth = betterAuth( {
  database: prismaAdapter(prisma, {
    provider: "mysql"
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
  },
  // adding role and user to session because role is a custom field and better auth  doesn't include custom fields in session by default
  session: {
    additionalFields: {
      role: {
        type: "string",
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        input: true,
      }
    }
  }
})