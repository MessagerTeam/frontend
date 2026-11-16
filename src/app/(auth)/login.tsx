import {View, Text} from "react-native";
import {Button} from "@/components/ui/button";
import {useRouter} from "expo-router";


export default function Login() {
    const router = useRouter();

    return(
        <View className="flex flex-col gap-[15px]">
            <Text>test</Text>
            <Button type={"button"} onPress={() => router.push("/register")}>Login</Button>
        </View>
    )
}