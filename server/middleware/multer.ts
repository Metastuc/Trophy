import multer from "multer";

import { toSize } from "#~/utils/size.ts";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: toSize({ unit: "megabytes", value: 5 }) },
});
