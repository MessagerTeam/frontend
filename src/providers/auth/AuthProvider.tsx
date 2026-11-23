import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    useEffect, ReactNode,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import {
    ACCESS_TOKEN_KEY,
    AuthContextValue,
    REFRESH_TOKEN_KEY,
} from "@/types/http";
import {UserSummary} from "@/types/user";
import {API_BASE_URL} from "@/constants/api";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserSummary | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function restoreSession(){
            try{
                const storedToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);

                if(isMounted && storedToken){
                    setAccessToken(storedToken);
                }
            }finally {
                if(isMounted){
                    setIsLoading(false);
                }
            }
        }

        void restoreSession();

        return() => {
            isMounted = false;
        }
    }, [])

    const getAccessToken = useCallback(async () => {
        if(accessToken){
            return accessToken;
        }

        return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    }, [accessToken]);

    const setTokens = useCallback(async (
        newAccessToken: string | null,
        newRefreshToken: string | null,
        newUser?: UserSummary | null
    ) => {

        await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken || "");
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefreshToken || "");

        setAccessToken(newAccessToken);

        if (newUser !== undefined) {
            setUser(newUser);
        }
    },[])

    const signIn = useCallback(async (username: string, password: string) => {
        const response = await fetch(
            `${API_BASE_URL}/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            },
        );

        if(!response.ok){
            throw new Error('Неверный username или пароль')
        }

        const data = (await response.json()) as {
            accessToken: string;
            refreshToken: string;
            user: UserSummary;
        }

        await setTokens(data.accessToken, data.refreshToken, data.user);

    },[setTokens]);

    const logout = useCallback(async () => {
        setAccessToken(null);
        setUser(null);

        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    }, [])

    const value = useMemo(
        () => ({
            isLoading,
            isAuthenticated: Boolean(accessToken),
            user,
            accessToken,
            setTokens,
            getAccessToken,
            logout,
            signIn
        }),
        [
            isLoading,
            accessToken,
            user,
            signIn,
            getAccessToken,
            setTokens,
            logout,
        ]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuthContext(): AuthContextValue{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('\'useAuthContext must be used within AuthProvider\'');
    }

    return context;
}
