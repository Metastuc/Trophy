import path from "path";
import { fileURLToPath } from "url";

type GetCwd = {
    dirname: string;
    filename: string;
};

export function getCwd(metaUrl: string): GetCwd {
    const filename = fileURLToPath(metaUrl);
    const dirname = path.dirname(filename);

    return { dirname, filename };
}
