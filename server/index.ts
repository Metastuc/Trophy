import cors from "cors";
import express, { type Request, type Response } from "express";
import { createServer } from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

import { SERVER_ENV } from "#config/constants.ts";
import { initIO } from "#config/socket.ts";
import { errorHandler } from "#middleware/error.ts";
import { loggingMiddleware } from "#middleware/logging.ts";
import { customResponse } from "#middleware/response.ts";
import { routes } from "#routes.ts";
import { getCwd } from "#utils/get-cwd.ts";
import { logger } from "#utils/logger.ts";

const app = express();
const server = createServer(app);
const port = SERVER_ENV.PORT;
const url = SERVER_ENV.ENVIRONMENT === "development" ? `http://localhost:${port}` : SERVER_ENV.CLIENT_URL;
const { dirname } = getCwd(import.meta.url);

app.get("/health", (_: Request, response: Response) => {
    response.status(200).json({ status: "ok" });
});

app.use(cors({ origin: SERVER_ENV.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggingMiddleware);
app.use(customResponse);
app.use("/api", routes);
app.use(errorHandler);

switch (SERVER_ENV.ENVIRONMENT) {
    case "development":
        console.log("Running in development mode");

        app.use(
            createProxyMiddleware({
                changeOrigin: true,
                pathFilter: ["!/api/**"],
                target: SERVER_ENV.CLIENT_URL,
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

initIO(server);
server.listen(port, function () {
    logger.info(`Server started on port ${port} \nAPI: ${url}/api`);
});
