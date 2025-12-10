import { MongoClient, Db } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string | undefined;
const dbName = process.env.MONGODB_DB as string | undefined;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}
if (!dbName) {
  // Do not throw here; allow connecting with the database specified in the
  // connection string (if present). Log a warning once so devs know to set it.
  // Use a global flag to avoid repeated warnings during hot-reloads / module
  // re-evaluation in dev mode.
  if (!global.__MONGODB_DB_WARNING_SHOWN) {
    console.warn(
      "MONGODB_DB is not set — falling back to the default DB from the connection string.",
    );
    global.__MONGODB_DB_WARNING_SHOWN = true;
  }
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  // Flag to avoid repeated console warnings during hot-reloads
  var __MONGODB_DB_WARNING_SHOWN: boolean | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const cli = await clientPromise;
  return dbName ? cli.db(dbName) : cli.db();
}

// Compatibility helper for older modules expecting `connectDB()`
// Many API routes in this project call `connectDB()`; keep this as a thin
// wrapper that ensures the client is connected and returns the DB instance.
export async function connectDB(): Promise<Db | undefined> {
  // Prefer establishing a Mongoose connection because the hiring models use mongoose.
  try {
    if (mongoose.connection.readyState === 1) {
      // Already connected
      return mongoose.connection.db as unknown as Db;
    }

    // Use the same URI used by the MongoClient
    await mongoose.connect(uri as string, {
      dbName,
      // useUnifiedTopology and useNewUrlParser are defaults in newer drivers
    });

    return mongoose.connection.db as unknown as Db;
  } catch (err) {
    // If mongoose connect fails, fall back to the MongoClient-based getDb so other code paths still work
    console.error("mongoose.connect failed:", err);
    return getDb();
  }
}
