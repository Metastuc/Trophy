import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { DataResponse, HttpMethod, makeRequest } from "#~/utils/axios.ts";

/**
 * Custom hook for handling API mutations.
 *
 * @param endpoint - API endpoint configuration.
 * @param options - Optional React Query mutation options.
 * @param transformRequestData - Optional function to transform client data to server data.
 * @returns React Query mutation hook.
 */
export function useServer<TRequest extends Record<string, unknown>, TResponse>(
    endpoint: { URL: string; METHOD: HttpMethod },
    options?: UseMutationOptions<DataResponse<TResponse>, Error, TRequest>,
    transformRequestData?: (variables: TRequest) => Record<string, unknown> | FormData | undefined,
) {
    return useMutation<DataResponse<TResponse>, Error, TRequest>({
        /**
         * Makes an HTTP request to the specified endpoint with the given method
         * and request data. If a transformRequestData function is provided, it
         * will be called with the variables and the result will be used as the
         * request data.
         *
         * @param variables - Request data.
         * @returns Promise that resolves with the response data.
         */
        mutationFn: async function (variables: TRequest) {
            return await makeRequest<TResponse>({
                url: endpoint.URL,
                method: endpoint.METHOD,
                data: transformRequestData ? transformRequestData(variables) : variables,
            });
        },

        /**
         * Called if the mutation encounters an error.
         * @param error The error encountered.
         *
         * If the error is an Axios error, it will be handled by displaying a toast error with the error message.
         * Otherwise, the error will be logged to the console.
         */
        onError: async function (error: Error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else {
                console.error(`Non-Axios Error: ${error}`);
                toast.error("An error occurred. Please try again later.");
            }
        },

        ...options,
    });
}
