import multer from "multer";

import { SERVER_CONSTANTS } from "#config/constants.ts";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: SERVER_CONSTANTS.FILE_UPLOAD_MAX_SIZE },
});
