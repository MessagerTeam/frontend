import {View, Text} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function ChatItem() {
    const { chatId } = useLocalSearchParams<{
        chatId: string;
    }>();

    return(
        <View>
            <Text>Test chat id: {chatId}</Text>
        </View>
    )
}