
import { useState } from "react";
import { View, Text, TextInput, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import { Button } from "@/components/ui/button";
import { useHttp } from "@/providers/http/useHttp";

export default function RegisterScreen() {
    const router = useRouter();
    const { http } = useHttp();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (!name.trim() || !email.trim() || !password) {
            Alert.alert("Ошибка", "Заполните все поля");
            return;
        }

        try {
            setIsLoading(true);

            await http.post("/auth/register", {
                name: name.trim(),
                email: email.trim(),
                password,
                displayName: displayName,
            });

            Alert.alert(
                "Успешно",
                "Аккаунт создан. Теперь войдите в систему."
            );

            router.replace("/login");
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                "Не удалось зарегистрироваться";

            Alert.alert("Ошибка регистрации", message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center px-6 gap-4">
            <Text className="text-2xl font-bold text-center" testID="register.heading">
                Регистрация
            </Text>
            <TextInput
                testID="register.name"
                className="border border-gray-300 rounded-xl px-4 py-3"
                placeholder="Имя"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
            />
            <TextInput
                testID="register.email"
                className="border border-gray-300 rounded-xl px-4 py-3"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                testID="register.password"
                className="border border-gray-300 rounded-xl px-4 py-3"
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                testID="register.displayName"
                className="border border-gray-300 rounded-xl px-4 py-3"
                placeholder="Отображаемое имя"
                value={displayName}
                onChangeText={setDisplayName}
            />
            <Button
                type="button"
                onPress={handleRegister}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text className="text-white" testID="register.submit">
                        Зарегистрироваться
                    </Text>
                )}
            </Button>
            <Button
                type="button"
                onPress={() => router.replace("/login")}
            >
                <Text className="text-white" testID="register.loginLink">
                    Уже есть аккаунт? Войти
                </Text>
            </Button>
        </View>
    );
}
