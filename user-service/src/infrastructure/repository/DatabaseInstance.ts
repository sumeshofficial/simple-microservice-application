import mongoose from "mongoose";
import { env } from "../../config/env.config";
import { logger } from "@shared/logger/logger";

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
      await mongoose.connect(env.MONGODB_URI);
      logger.info("MongoDB connected successfully");
    } catch (error) {
      logger.error(error, "MongoDB connection error:");
      throw new Error("Cannot connect to MongoDB");
    }
  }
  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info("MongoDB disconnected successfully");
    } catch (error) {
      logger.error(error, "MongoDB disconnection error:");
    }
  }
}
