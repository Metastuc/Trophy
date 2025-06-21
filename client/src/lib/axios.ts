import axios, { AxiosInstance, AxiosResponse } from "axios";

/**
 * Define supported HTTP methods.
 */
export type HttpMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";

/**
 * Define DataResponse type for receiving requests
 */
export type DataResponse<T> = {
    config: AxiosResponse<T>["config"];
    data: AxiosResponse<T>["data"];
    headers: AxiosResponse<T>["headers"];
    request?: AxiosResponse<T>["request"];
    status: AxiosResponse<T>["status"];
    statusText: AxiosResponse<T>["statusText"];
};

/**
 * Define RequestOptions type for configuring requests.
 */
type RequestOptions = {
    data?: Record<string, unknown> | FormData | string;
    headers?: Record<string, string>;
    method: HttpMethod;
    params?: Record<string, unknown>;
    url: string;
};

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

/**
 * A reusable function for making HTTP requests using Axios.
 *
 * @template T - The expected response type.
 * @param options - The configuration options for the request.
 * @returns A promise that resolves with the response details.
 * @throws Will throw an error if the request fails.
 */
export async function makeRequest<T>({
    data,
    headers,
    method,
    params,
    url,
}: RequestOptions): Promise<DataResponse<T>> {
    /**
     * Determine if the request is to an external API (full URL).
     * If so, bypass the axiosInstance baseURL.
     */
    const isExternalApi = url.startsWith("http");

    try {
        /**
         * Send the request using the configured Axios instance.
         */
        const response: AxiosResponse<T> = isExternalApi
            ? await axios({ url, method, params, headers, data })
            : await axiosInstance({ url, method, params, headers, data });

        const {
            config,
            data: responseData,
            headers: responseHeaders,
            request,
            status,
            statusText,
        } = response;

        /**
         * Return the response data and status.
         */
        return {
            config,
            data: responseData,
            headers: responseHeaders,
            request,
            status,
            statusText,
        };
    } catch (error) {
        /**
         * Handle Axios errors.
         */
        if (axios.isAxiosError(error)) {
            console.error("Axios Error:", error);
        } else {
            /**
             * Handle non-Axios errors.
             */
            console.error("Error making request:", error);
        }

        throw error;
    }
}
