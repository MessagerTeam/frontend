import {View, Text} from "react-native";
import {Button} from "@/components/ui/button";
import {useRouter} from "expo-router";

export default function RegisterScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 items-center justify-center">
            <Text>Register</Text>
            <Button type={"button"} onPress={() => router.push("/login")}>Login</Button>
        </View>
    );
}