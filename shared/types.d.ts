type ApiResponse<T = unknown> = {
    code: number;
    data: T;
    message?: string;
    path?: string;
    status?: "success" | "error";
    timestamp?: string;
    [key: string]: unknown;
};
