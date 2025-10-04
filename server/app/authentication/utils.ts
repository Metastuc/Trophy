import { saveToS3 } from "#services/s3/save.ts";

export function validateUsername({ username, fc }: { username: string; fc: boolean }): string {
    if (!username) throw { status: 422, message: "username is required" };

    const formatRegex = /[ _-]/g;
    const hasNonAcceptableChars = formatRegex.test(username);

    if (String(fc) !== "false") return username.replace(formatRegex, "");
    if (hasNonAcceptableChars) throw { status: 400, message: "username cannot have spaces, underscores or space" };

    return username;
}

export async function getUserProfilePicture({
    profilePicture,
    fileBuffer,
    fileName,
}: {
    profilePicture: string;
    fileBuffer?: Buffer;
    fileName?: string;
}): Promise<string | undefined> {
    if (fileBuffer && fileName) return await saveToS3({ file: fileBuffer, fileName, folder: "profile-images" });
    if (profilePicture && profilePicture !== "default-pfp.svg") return profilePicture;
    return undefined;
}
