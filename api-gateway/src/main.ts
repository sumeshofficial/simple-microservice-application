import { env } from "@config/env.config";
import { app } from "./app";
import logger from "@config/logger.config";

const startServer = () => {
  try {
    const server = app.listen(env.PORT, () => {
      logger.info(`${env.SERVICE_NAME} running on port: ${env.PORT}`);
    });

    let isShuttingDown = false;

    const gracefulShutdown = async (signal: string) => {
      if (isShuttingDown) return;
      isShuttingDown = true;

      logger.info(`Received ${signal}. Shutting down gracefully...`);

      const timeout = setTimeout(() => {
        logger.error("Force shutdown due to timeout");
        process.exit(1);
      }, 10000);

      server.close(() => {
        logger.info("HTTP server closed.");
        logger.info("Graceful shutdown complete.");
        clearTimeout(timeout);
        process.exit(0);
      });

      process.on("SIGINT", () => gracefulShutdown("SIGINT"));
      process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    };
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Promise Rejection:", err);
});

startServer();