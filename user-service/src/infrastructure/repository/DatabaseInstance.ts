import mongoose from "mongoose";
import { env } from "../../config/env.config";

export class MongoDatabase {
  private static instance: MongoDatabase;

  private constructor() {}

  public static getInstance(): MongoDatabase {
    if (!MongoDatabase.instance) {
      MongoDatabase.instance = new MongoDatabase();
    }
    return MongoDatabase.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(env.MONGODB_URL);
      console.log("Db connected successfully")
    } catch (error) {
      throw new Error("Cannot connect to MongoDB");
    }
  }
  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.log("Error disconnecting from MongoDB:");
    }
  }
}
