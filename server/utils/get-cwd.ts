import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

type GetCwd = {
    dirname: string;
    filename: string;
    rootDir: string;
};

export function getCwd(metaUrl: string): GetCwd {
    const filename = fileURLToPath(metaUrl);
    const dirname = path.dirname(filename);

    let currentDir = dirname;
    while (!fs.existsSync(path.join(currentDir, "package.json"))) {
        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) break;
        currentDir = parentDir;
    }
    const rootDir = currentDir;

    return { dirname, filename, rootDir };
}
