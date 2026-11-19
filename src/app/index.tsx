import {Redirect} from "expo-router";
import {useAuth} from "@/providers/auth/useAuth";
import {ActivityIndicator, View} from "react-native";

export default function Index(){
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <Redirect href="/(auth)/login" />;
}