import {UserSummary} from "@/types/user";
import {AxiosInstance} from "axios";

export type GetAccessToken = () => Promise<string | null>

export type OnUnauthorized = () => Promise<void>

export interface HttpClientOptions{
    baseURL: string;
    getAccessToken?: GetAccessToken;
    onUnauthorized?: OnUnauthorized;
}

export const ACCESS_TOKEN_KEY = 'auth.accessToken';
export const REFRESH_TOKEN_KEY = 'auth.refreshToken';

export type AuthContextValue = {
    isLoading: boolean,
    isAuthenticated: boolean,
    user: UserSummary | null,
    accessToken: string | null,

    signIn: (username: string, password: string) => Promise<void>;
    getAccessToken: () => Promise<string | null>;
    setTokens: (
        accessToken: string | null,
        refreshToken: string | null,
        newUser?: UserSummary | null
    ) => Promise<void>;
    logout: () => Promise<void>
}

export interface HttpContextValue {
    http: AxiosInstance;
}