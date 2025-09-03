type ApiResponse<T = unknown> = {
    data?: T;
    message?: string;
    path: string;
    status: "success" | "error";
    timestamp: string;
    [key: string]: unknown;
};
