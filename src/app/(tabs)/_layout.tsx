
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#2563EB",
                tabBarInactiveTintColor: "#94A3B8",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Чаты",
                    tabBarLabel: "Чаты",
                }}
            />

            <Tabs.Screen
                name="contacts"
                options={{
                    title: "Контакты",
                    tabBarLabel: "Контакты",
                }}
            />

            <Tabs.Screen
                name="calls"
                options={{
                    title: "Звонки",
                    tabBarLabel: "Звонки",
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Профиль",
                    tabBarLabel: "Профиль",
                }}
            />
        </Tabs>
    );
}
