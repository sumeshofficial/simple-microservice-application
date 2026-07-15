import "dotenv/config";
import { z } from "zod";
import pkg from "../../package.json" with { type: "json" };

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),

  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_EXPIRES_IN: z.string().default("1d"),

  LOG_LEVEL: z.string().default("debug"),

  SERVICE_NAME: z.string().default(pkg.name),

  DEFAULT_TIMEOUT: z.string(),

  RATE_LIMIT_WINDOW: z.string().default("15"),
  RATE_LIMIT_MAX_REQUESTS: z.string().default("100"),

  USER_SERVICE_URL: z.string().default("http://localhost:3001"),
  ORDER_SERVICE_URL: z.string().default("http://localhost:3002"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const formattedErrors = parsedEnv.error.issues.map((issue) => {
    const path = issue.path.join(".");
    return `- ${path}: ${issue.message}`;
  });

  throw new Error(
    `Invalid environment variables:\n${formattedErrors.join("\n")}`
  );
}

export const env = parsedEnv.data;

export type Env = z.infer<typeof envSchema>;
