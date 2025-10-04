import { SUPPORTED_FILE_CONTENT_TYPES } from "#~/store/file-limits.ts";

import { deleteFromS3 } from "./delete";
import { saveToS3 } from "./save";

interface ReplaceInS3Params {
    folder: string;
    newFile: Buffer;
    newFileName: string;
    oldKeyOrUrl: string;
    contentType?: (typeof SUPPORTED_FILE_CONTENT_TYPES)[number];
    maxSize?: number;
    resize?: { width: number; height: number };
}

export async function replaceInS3({
    folder,
    newFile,
    newFileName,
    oldKeyOrUrl,
    contentType,
    maxSize,
    resize,
}: ReplaceInS3Params) {
    if (oldKeyOrUrl) {
        try {
            await deleteFromS3(oldKeyOrUrl);
        } catch (error) {
            throw new Error(`Failed to delete old file from S3: ${(error as Error).message}`);
        }
    }

    return await saveToS3({
        file: newFile,
        fileName: newFileName,
        folder,
        contentType,
        maxSize,
        resize,
    });
}
