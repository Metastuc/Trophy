import { deleteFromS3 } from "./delete";
import { saveToS3 } from "./save";

export async function replaceInS3({ oldKeyOrUrl, ...rest }: ReplaceInS3Params) {
    await deleteFromS3(oldKeyOrUrl);
    return await saveToS3(rest);
}
