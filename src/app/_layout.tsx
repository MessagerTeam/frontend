import { Stack } from 'expo-router';
import { AuthProvider } from '@/providers/auth/AuthProvider';
import { HttpProvider } from '@/providers/http/HttpProvider';

import '../global.css';

export default function RootLayout() {
    return (
        <AuthProvider>
            <HttpProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen
                        name="chats/[chatId]"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </HttpProvider>
        </AuthProvider>
    );
}