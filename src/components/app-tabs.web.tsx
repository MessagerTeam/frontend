import {
    Tabs,
    TabList,
    TabTrigger,
    TabSlot,
    type TabTriggerSlotProps,
    type TabListProps,
} from "expo-router/ui";

import { SymbolView } from "expo-symbols";
import { Pressable, useColorScheme, View } from "react-native";

import { Colors } from "@/constants/theme";

import { ExternalLink } from "./external-link";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export default function AppTabs() {
    return (
        <Tabs>
            <TabSlot className="h-full" />

            <TabList asChild>
                <CustomTabList>
                    <TabTrigger name="home" href="/" asChild>
                        <TabButton>Home</TabButton>
                    </TabTrigger>

                    <TabTrigger name="explore" href="/explore" asChild>
                        <TabButton>Explore</TabButton>
                    </TabTrigger>
                </CustomTabList>
            </TabList>
        </Tabs>
    );
}

export function TabButton({
                              children,
                              isFocused,
                              ...props
                          }: TabTriggerSlotProps) {
    return (
        <Pressable
            {...props}
            className="active:opacity-70"
        >
            <ThemedView
                type={isFocused ? "backgroundSelected" : "backgroundElement"}
                className="rounded-xl px-3 py-1"
            >
                <ThemedText
                    type="small"
                    themeColor={isFocused ? "text" : "textSecondary"}
                >
                    {children}
                </ThemedText>
            </ThemedView>
        </Pressable>
    );
}

export function CustomTabList(props: TabListProps) {
    const scheme = useColorScheme();
    const colors = Colors[scheme === "dark" ? "dark" : "light"];

    return (
        <View
            {...props}
            className="absolute w-full flex-row items-center justify-center p-3"
        >
            <ThemedView
                type="backgroundElement"
                className="max-w-[720px] flex-grow flex-row items-center gap-2 rounded-xl px-5 py-2"
            >
                <ThemedText type="smallBold" className="mr-auto">
                    Expo Starter
                </ThemedText>

                {props.children}

                <ExternalLink
                    href="https://docs.expo.dev"
                    asChild
                >
                    <Pressable className="ml-3 flex-row items-center justify-center gap-1">
                        <ThemedText type="link">Docs</ThemedText>

                        <SymbolView
                            tintColor={colors.text}
                            name={{ ios: "arrow.up.right.square", web: "link" }}
                            size={12}
                        />
                    </Pressable>
                </ExternalLink>
            </ThemedView>
        </View>
    );
}