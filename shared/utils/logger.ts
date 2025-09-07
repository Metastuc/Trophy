const rid = (): string => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const safe = (v: unknown): string => {
    try {
        return JSON.stringify(v);
    } catch {
        return String(v);
    }
};

interface LogInput {
    module?: string;
    tag?: string;
    id?: string;
    msg?: string;
    data?: unknown;
}

function format({ module, tag, id = rid(), msg, data }: LogInput): string {
    return (
        `[${module ?? "app"}][${tag ?? "log"}][${id}] ${msg ?? ""}` + (data !== undefined ? " :: " + safe(data) : "")
    );
}

function baseLog(input: LogInput): void {
    console.log("\n" + format(input) + "\n");
}

baseLog.info = (input: LogInput): void => {
    console.log("\n" + format({ ...input, tag: input.tag ?? "info" }) + "\n");
};

baseLog.error = (input: LogInput): void => {
    console.error("\n" + format({ ...input, tag: input.tag ?? "error" }) + "\n");
};

baseLog.warn = (input: LogInput): void => {
    console.warn("\n" + format({ ...input, tag: input.tag ?? "warn" }) + "\n");
};

baseLog.debug = (input: LogInput): void => {
    console.debug("\n" + format({ ...input, tag: input.tag ?? "debug" }) + "\n");
};

export const log = baseLog as typeof baseLog & {
    info: (input: LogInput) => void;
    error: (input: LogInput) => void;
    warn: (input: LogInput) => void;
    debug: (input: LogInput) => void;
};
