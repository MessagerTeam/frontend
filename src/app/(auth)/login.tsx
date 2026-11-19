import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    ActivityIndicator,
} from 'react-native';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth/useAuth';
import { Link } from 'expo-router';

export default function Login() {
    const { signIn, isLoading } = useAuth();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async () => {
        if (!username.trim() || !password) {
            Alert.alert('Ошибка', 'Заполните имя и пароль');
            return;
        }

        try {
            setIsSubmitting(true);
            await signIn(username.trim(), password);

        } catch (error) {
            Alert.alert(
                'Ошибка авторизации',
                error instanceof Error
                    ? error.message
                    : 'Не удалось выполнить вход'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="flex-1 justify-center gap-[15px] px-5">
            <Text className="text-2xl font-bold">
                Авторизация
            </Text>
            <TextInput
                className="h-12 rounded-xl border border-gray-300 px-4"
                placeholder="Имя"
                value={username}
                onChangeText={setUserName}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                className="h-12 rounded-xl border border-gray-300 px-4"
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                type="button"
                onPress={handleLogin}
                disabled={isSubmitting || isLoading}
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text className="text-white">
                        Войти
                    </Text>
                )}
            </Button>
            <Link href="/(auth)/register">
                <Text className="text-center text-blue-600">
                    Нет аккаунта? Зарегистрироваться
                </Text>
            </Link>
        </View>
    );
}
