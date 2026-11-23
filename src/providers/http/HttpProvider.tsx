import {
    createContext, ReactNode,
    useContext,
    useMemo
} from 'react';
import createHttpClient from './http-client';
import {useAuth} from '../auth/useAuth'
import {HttpContextValue} from "@/types/http";
import {API_BASE_URL} from "@/constants/api";

const HttpContext = createContext<HttpContextValue | null>(null);

export function HttpProvider({ children }: { children: ReactNode }) {
    const {getAccessToken, logout} = useAuth();

    const http = useMemo(
        () => createHttpClient({
            baseURL: API_BASE_URL,
            getAccessToken,
            onUnauthorized: logout,
        }),[getAccessToken, logout],
    )

    return (
        <HttpContext.Provider value={{http}}>
            {children}
        </HttpContext.Provider>
    );

}


export function useHttpContext(): HttpContextValue {
    const context = useContext(HttpContext);

    if (!context) {
        throw new Error('useHttpContext must be used within HttpProvider');
    }

    return context;
}