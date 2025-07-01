import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var __db__: PrismaClient;
}

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// In production, we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient();
  }
  db = global.__db__;
}

// Only connect if we're not in a build environment
if (process.env.NODE_ENV !== "production" && typeof window === "undefined") {
  db.$connect().catch((error) => {
    console.error("Failed to connect to database:", error);
  });
}

export { db }; 