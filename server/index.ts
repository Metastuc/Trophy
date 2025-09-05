import cors from "cors";
import express, { type Request, type Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

import { APP_SETTINGS } from "#config/settings.ts";
import { errorHandler } from "#middleware/error.ts";
import { loggingMiddleware } from "#middleware/logging.ts";
import { customResponse } from "#middleware/response.ts";
import { routes } from "#routes.ts";
import { getCwd } from "#utils/get-cwd.ts";
import { logger } from "#utils/logger.ts";

const app = express();
const port = APP_SETTINGS.PORT;
const url = APP_SETTINGS.ENVIRONMENT === "development" ? `http://localhost:${port}` : APP_SETTINGS.CLIENT_URL;
const { dirname } = getCwd(import.meta.url);

app.use(cors({ origin: APP_SETTINGS.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggingMiddleware);
app.use(customResponse);
app.use("/api", routes);
app.use(errorHandler);

switch (APP_SETTINGS.ENVIRONMENT) {
    case "development":
        console.log("Running in development mode");

        app.use(
            createProxyMiddleware({
                changeOrigin: true,
                pathFilter: ["!/api/**"],
                target: APP_SETTINGS.CLIENT_URL,
                ws: true,
            }),
        );
        break;

    case "production":
    case "staging":
        console.log("Running in production/staging mode");

        app.use(express.static(path.join(dirname, "..", "dist")));
        app.get("/{*splat}", function (_request: Request, response: Response) {
            response.sendFile(path.join(dirname, "..", "dist", "index.html"));
        });
        break;

    default:
        logger.error("Invalid ENVIRONMENT, shutting down server");
        process.exit(1);
}

app.listen(port, function () {
    logger.info(`Server started on port ${port} \nAPI: ${url}/api`);
});
