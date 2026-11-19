import axios, {
    type AxiosError,
} from 'axios';
import {HttpClientOptions} from "@/types/http";

export default function createHttpClient(
    {baseURL, getAccessToken, onUnauthorized}: HttpClientOptions
) {
    const http = axios.create({
        baseURL,
        timeout: 15_000,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    http.interceptors.request.use(
        (response) => response,
        async (error: AxiosError) => {
            if(error.response?.status === 401) {
                if (onUnauthorized) {
                    await onUnauthorized();
                }
            }

            return Promise.reject(error);
        }
    )

    return http;
}