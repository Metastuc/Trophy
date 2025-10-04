import { toSize } from "#~/utils/size.ts";

export const FILE_SIZE_LIMITS = {
    profilePicture: toSize({ unit: "megabytes", value: 5 }),
    streamThumbnail: toSize({ unit: "megabytes", value: 2 }),
};

export const SUPPORTED_FILE_CONTENT_TYPES = ["image/jpeg", "image/png"] as const;
