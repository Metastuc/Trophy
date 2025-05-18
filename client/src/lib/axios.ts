import axios, { AxiosHeaders, AxiosResponse } from "axios";

/**
 * Define supported HTTP methods.
 */
export type HttpMethod = "GET" | "POST" | "DELETE" | "PUT";

/**
 * Define RequestOptions type for configuring requests.
 */
type RequestOptions = {
    url: string;
    method: HttpMethod;
    params?: Record<string, unknown>;
    headers?: AxiosHeaders;
    data?: Record<string, unknown>;
};

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

/**
 * A reusable function for making HTTP requests using Axios.
 *
 * @template T - The expected response type.
 * @param options - The configuration options for the request.
 * @returns A promise that resolves with the response data.
 * @throws Will throw an error if the request fails.
 */
export async function makeRequest<T>({
    url,
    method,
    params,
    headers,
    data,
}: RequestOptions): Promise<T> {
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

        /**
         * Return the response data.
         */
        return response.data as T;
    } catch (error) {
        /**
         * Handle Axios errors.
         */
        if (axios.isAxiosError(error)) {
            console.error(error);
        } else {
            /**
             * Handle non-Axios errors.
             */
            console.error("Error making request:", error);
        }

        throw error;
    }
}
